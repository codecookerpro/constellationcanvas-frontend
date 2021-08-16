import ActionTypes from 'constants/action-types';
import { createAction } from 'redux-actions';
import * as API from 'services/boards';
import { setUsers } from './auth';
import { setLoading } from './auxiliary';
import { handleError } from './error';

export const setBoardDetail = createAction(ActionTypes.SET_BOARD_DETAIL, (payload) => payload);
export const setCanvasIndex = createAction(ActionTypes.SET_CANVAS_INDEX, (payload) => payload);
export const setBoard = createAction(ActionTypes.SET_TOPIC, (payload) => payload);

export const getBoardDetail = () => (dispatch, getState) => {
  dispatch(setLoading(true));

  const { boardUUID } = getState().auth.profile;
  API.getBoardDetail(boardUUID)
    .then((data) => {
      dispatch(setBoardDetail(data));
      dispatch(setUsers(data.participants));
      dispatch(setLoading(false));
    })
    .catch((error) => dispatch(handleError(error)));
};

export const switchCanvas = (index) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const { boardUUID } = getState().auth.profile;
  API.switchCanvas(boardUUID, index).then(() => {
    dispatch(setCanvasIndex(index));
    dispatch(getBoardDetail());
  });
};

export const updateBoard = (params) => (dispatch) => {
  API.updateBoard(params)
    .then((data) => {
      dispatch(setBoard(data));
    })
    .catch((error) => dispatch(handleError(error)));
};

export const setCopiedWidget = (widget) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_COPIED_WIDGET,
    widget,
  });
};

export const addWidget = (widget) => (dispatch) => {
  dispatch({
    type: ActionTypes.ADD_WIDGET,
    widget,
  });
};

export const removeWidget = (id) => (dispatch) => {
  dispatch({
    type: ActionTypes.REMOVE_WIDGET,
    id,
  });
};

export const setWidgetTransform =
  ({ id, transform }) =>
  (dispatch) => {
    dispatch({
      type: ActionTypes.SET_WIDGET_TRANSFORM,
      id,
      transform,
    });
  };

export const setWidgetData =
  ({ id, data }) =>
  (dispatch) => {
    dispatch({
      type: ActionTypes.SET_WIDGET_DATA,
      id,
      data,
    });
  };

export const setWidgetHovered = (id) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_WIDGET_HOVERED,
    id,
  });
};

export const bringToFront = (id) => (dispatch) => {
  dispatch({
    type: ActionTypes.BRING_TO_FRONT,
    id,
  });
};

export const sendToBack = (id) => (dispatch) => {
  dispatch({
    type: ActionTypes.SEND_TO_BACK,
    id,
  });
};

export const bringForward =
  ({ id, forwardId }) =>
  (dispatch) => {
    dispatch({
      type: ActionTypes.BRING_FORWARD,
      id,
      forwardId,
    });
  };

export const sendBackward =
  ({ id, backwardId }) =>
  (dispatch) => {
    dispatch({
      type: ActionTypes.SEND_BACKWARD,
      id,
      backwardId,
    });
  };
