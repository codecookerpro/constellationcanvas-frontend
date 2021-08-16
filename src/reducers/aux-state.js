import ActionTypes from 'constants/action-types';
import { handleActions } from 'redux-actions';
import * as auxStateUpdaters from './aux-state-updaters';

const actionHandler = {
  [ActionTypes.SET_LOADING]: auxStateUpdaters.setLoadingUpdater,
};

export default handleActions(actionHandler, auxStateUpdaters.INITIAL_AUX_STATE);
