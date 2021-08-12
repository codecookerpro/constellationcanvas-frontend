import ActionTypes from 'constants/action-types';

export const setIndex = (index) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_INDEX,
    index,
  });
};

export const setTopic = (topic) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_TOPIC,
    topic,
  });
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
