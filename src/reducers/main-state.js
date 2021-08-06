import { handleActions } from 'redux-actions';
import ActionTypes from 'constants/action-types';
import * as mainStateUpdaters from './main-state-updaters';

const actionHandler = {
  [ActionTypes.SET_TOPIC]: mainStateUpdaters.setTopic,
  [ActionTypes.SET_COPIED_WIDGET]: mainStateUpdaters.setCopiedWidget,
};

export default handleActions(actionHandler, mainStateUpdaters.INITIAL_MAIN_STATE);
