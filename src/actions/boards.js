import ActionTypes from 'utils/constants/action-types';
import { createAction } from 'redux-actions';
import { setUsers } from './auth';
import { setLoading } from './auxiliary';
import * as API from 'services/boards';

export const addFigure = createAction(ActionTypes.ADD_FIGURE, (payload) => payload);
export const removeFigure = createAction(ActionTypes.REMOVE_FIGURE, (payload) => payload);
export const setFigure = createAction(ActionTypes.SET_FIGURE, (payload) => payload);
export const setCopiedFigure = createAction(ActionTypes.SET_COPIED_FIGURE, (payload) => payload);
export const setBoard = createAction(ActionTypes.SET_BOARD, (payload) => payload);
export const setCanvasIndex = createAction(ActionTypes.SET_CANVAS_INDEX, (payload) => payload);
export const setFigureHovered = createAction(ActionTypes.SET_FIGURE_HOVERED, (payload) => payload);

export const getBoard = () => (dispatch, getState) => {
  dispatch(setLoading(true));

  const { boardUUID } = getState().auth.profile;
  API.getBoard(boardUUID).then((data) => {
    dispatch(setBoard(data));
    dispatch(setUsers(data.participants));
    dispatch(setLoading(false));
  });
};

export const switchCanvas = (index) => (dispatch, getState) => {
  const { boardUUID } = getState().auth.profile;
  API.switchCanvas(boardUUID, index).then(() => {
    dispatch(setCanvasIndex(index));
  });
};

export const updateBoard = (params) => (dispatch) => {
  API.updateBoard(params).then((data) => {
    dispatch(setBoard(data));
  });
};

export const createFigure = (figure) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const { index: canvas, uuid: boardUUID } = getState().board;
  API.createFigure({ ...figure, canvas, boardUUID }).then((data) => {
    dispatch(addFigure(data));
    dispatch(setLoading(false));
  });
};

export const updateFigure = (figure) => (dispatch, getState) => {
  const { index: canvas, uuid: boardUUID } = getState().board;
  dispatch(setFigure(figure));
  API.updateFigure(figure.uuid, { ...figure, canvas, boardUUID }).then((data) => {
    dispatch(setFigure(data));
  });
};

export const deleteFigure = (figureUUID) => (dispatch) => {
  dispatch(setLoading(true));

  API.deleteFigure(figureUUID).then(() => {
    dispatch(removeFigure(figureUUID));
    dispatch(setLoading(false));
  });
};
