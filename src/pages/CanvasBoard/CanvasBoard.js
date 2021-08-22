import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WidgetEditor } from 'components';
import { getBoard, setSelectedParticipant } from 'actions';
import { setupSocket } from 'services/websocket';
import { removeFigure, setBoard, setCanvasIndex, setFigure } from 'actions';

export default function CanvasBoard() {
  const { index, figures, copiedFigure, selectedParticipant } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const { accessToken, profile } = useSelector((state) => state.auth);
  const socket = useMemo(() => accessToken && setupSocket(accessToken), [accessToken]);
  const filteredFigures = useMemo(
    () => figures.filter((f) => f.canvas === index && selectedParticipant === f.creatorUUID),
    [index, figures, selectedParticipant]
  );

  // eslint-disable-next-line
  useEffect(() => dispatch(getBoard()), []);

  // eslint-disable-next-line
  useEffect(() => selectedParticipant || dispatch(setSelectedParticipant(profile.uuid)), [profile, selectedParticipant]);

  useEffect(() => {
    if (socket) {
      socket.removeAllListeners();
      socket.on('figuresCU', (figure) => dispatch(setFigure(figure)));
      socket.on('figureD', (figure) => dispatch(removeFigure(figure.uuid)));
      socket.on('board', (board) => dispatch(setBoard(board)));
      socket.on('canvas', (user) => dispatch(setCanvasIndex(user.currentCanvas)));
    }
    // eslint-disable-next-line
  }, [socket]);

  return <WidgetEditor figures={filteredFigures} copiedFigure={copiedFigure} index={index} />;
}
