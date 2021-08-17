import { handleActions } from 'redux-actions';
import ActionTypes from 'constants/action-types';
import * as boardStateUpdaters from './board-state-updaters';

const actionHandler = {
  [ActionTypes.SET_BOARD_DETAIL]: boardStateUpdaters.setBoardUpdater,
  [ActionTypes.SET_CANVAS_INDEX]: boardStateUpdaters.setCanvasIndexUpdater,
  [ActionTypes.SET_TOPIC]: boardStateUpdaters.setBoardUpdater,
  [ActionTypes.SET_COPIED_WIDGET]: boardStateUpdaters.setCopiedWidgetUpdater,
  [ActionTypes.ADD_WIDGET]: boardStateUpdaters.addWidgetUpdater,
  [ActionTypes.REMOVE_WIDGET]: boardStateUpdaters.removeWidgetUpdater,
  [ActionTypes.SET_WIDGET_TRANSFORM]: boardStateUpdaters.setWidgetTransformUpdater,
  [ActionTypes.SET_WIDGET_DATA]: boardStateUpdaters.setWidgetDataUpdater,
  [ActionTypes.SET_WIDGET_HOVERED]: boardStateUpdaters.setWidgetHoveredUpdater,
  [ActionTypes.BRING_TO_FRONT]: boardStateUpdaters.bringToFrontUpdater,
  [ActionTypes.SEND_TO_BACK]: boardStateUpdaters.sendToBackUpdater,
  [ActionTypes.BRING_FORWARD]: boardStateUpdaters.bringForwardUpdater,
  [ActionTypes.SEND_BACKWARD]: boardStateUpdaters.sendBackwardUpdater,
};

export default handleActions(actionHandler, boardStateUpdaters.INITIAL_BOARD_STATE);
