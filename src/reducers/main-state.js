import { handleActions } from 'redux-actions';
import ActionTypes from 'constants/action-types';
import * as mainStateUpdaters from './main-state-updaters';

const actionHandler = {
  [ActionTypes.SET_TOPIC]: mainStateUpdaters.setTopicUpdater,
  [ActionTypes.SET_COPIED_WIDGET]: mainStateUpdaters.setCopiedWidgetUpdater,
  [ActionTypes.ADD_WIDGET]: mainStateUpdaters.addWidgetUpdater,
  [ActionTypes.REMOVE_WIDGET]: mainStateUpdaters.removeWidgetUpdater,
  [ActionTypes.SET_WIDGET_TRANSFORM]: mainStateUpdaters.setWidgetTransformUpdater,
  [ActionTypes.SET_WIDGET_DATA]: mainStateUpdaters.setWidgetDataUpdater,
  [ActionTypes.SET_WIDGET_HOVERED]: mainStateUpdaters.setWidgetHoveredUpdater,
  [ActionTypes.BRING_TO_FRONT]: mainStateUpdaters.bringToFrontUpdater,
  [ActionTypes.SEND_TO_BACK]: mainStateUpdaters.sendToBackUpdater,
  [ActionTypes.BRING_FORWARD]: mainStateUpdaters.bringForwardUpdater,
  [ActionTypes.SEND_BACKWARD]: mainStateUpdaters.sendBackwardUpdater,
};

export default handleActions(actionHandler, mainStateUpdaters.INITIAL_MAIN_STATE);
