import { keyMirror } from 'utils';

const ActionTypes = keyMirror({
  // canvas
  SET_BOARD_DETAIL: null,
  SET_PARTICIPANTS: null,
  SET_INDEX: null,
  SET_TOPIC: null,
  SET_COPIED_WIDGET: null,
  ADD_WIDGET: null,
  REMOVE_WIDGET: null,
  SET_WIDGET_TRANSFORM: null,
  SET_WIDGET_DATA: null,
  SET_WIDGET_HOVERED: null,
  BRING_TO_FRONT: null,
  SEND_TO_BACK: null,
  BRING_FORWARD: null,
  SEND_BACKWARD: null,

  // error
  HANDLE_ERROR: null,

  // auth
  SET_USER_INFO: null,
  SET_USERS: null,

  // aux
  SET_LOADING: null,
});

export default ActionTypes;
