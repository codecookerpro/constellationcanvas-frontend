import { handleError, removeFigure, setBoard, setCanvasIndex, setFigure } from 'actions';
import { setUserInfo } from 'actions/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios, { setupAxiosInterceptorsRequest, setupAxiosInterceptorsResponse } from 'services/axios';
import { setupSocket } from 'services/websocket';
import { USER_ROLES } from 'utils/constants';

const useInitApp = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.accessToken;
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    if (accessToken) {
      setupAxiosInterceptorsRequest(axios, accessToken);

      const profile = JSON.parse(localStorage.profile);
      const socket = setupSocket(accessToken);
      socket.on('figuresCU', (figure) => profile.uuid !== figure.creatorUUID && dispatch(setFigure(figure)));
      socket.on('figureD', (figure) => profile.uuid !== figure.creatorUUID && dispatch(removeFigure(figure.uuid)));
      socket.on('board', (board) => profile.role !== USER_ROLES.facilitator && dispatch(setBoard(board)));
      socket.on('canvas', (user) => profile.uuid !== user.uuid && dispatch(setCanvasIndex(user.currentCanvas)));

      const storedProfile = JSON.parse(localStorage.profile);
      dispatch(setUserInfo(accessToken, storedProfile));
    }

    setupAxiosInterceptorsResponse(axios, (error) => {
      dispatch(handleError(error?.response));
      return Promise.reject(error);
    });

    setInitialized(true);
  }
};

export default useInitApp;
