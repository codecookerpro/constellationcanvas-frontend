import { keyMirror } from 'utils';

export const ActionTypes = keyMirror({
  // canvas
  SET_BOARD: null,
  SET_CANVAS_INDEX: null,
  SET_COPIED_FIGURE: null,
  ADD_FIGURE: null,
  REMOVE_FIGURE: null,
  SET_FIGURE: null,
  SET_FIGURE_HOVERED: null,

  // error
  HANDLE_ERROR: null,

  // auth
  SET_USER_INFO: null,
  SET_USERS: null,
  TOGGLE_USER_OPEN: null,

  // aux
  SET_LOADING: null,
  SET_ERROR: null,
});

export default ActionTypes;
