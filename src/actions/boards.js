import ActionTypes from 'constants/action-types';
import { createAction } from 'redux-actions';
import * as API from 'services/boards';
import { setUsers } from './auth';
import { setLoading } from './auxiliary';
import { handleError } from './error';

export const setCopiedWidget = createAction(ActionTypes.SET_COPIED_WIDGET, (widget) => widget);
export const addWidget = createAction(ActionTypes.ADD_WIDGET, (widget) => widget);
export const removeWidget = createAction(ActionTypes.REMOVE_WIDGET, (widgetId) => widgetId);
export const setWidgetTransform = createAction(ActionTypes.SET_WIDGET_TRANSFORM, (payload) => payload);
export const setWidgetData = createAction(ActionTypes.SET_WIDGET_DATA, (payload) => payload);
export const setWidgetHovered = createAction(ActionTypes.SET_WIDGET_HOVERED, (widgetId) => widgetId);
export const bringToFront = createAction(ActionTypes.BRING_TO_FRONT, (widgetId) => widgetId);
export const sendToBack = createAction(ActionTypes.SEND_TO_BACK, (widgetId) => widgetId);
export const bringForward = createAction(ActionTypes.BRING_FORWARD, (widgetId) => widgetId);
export const sendBackward = createAction(ActionTypes.SEND_BACKWARD, (widgetId) => widgetId);
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
