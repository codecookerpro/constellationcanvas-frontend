import ActionTypes from 'utils/constants/action-types';
import { handleActions } from 'redux-actions';
import * as auxStateUpdaters from './aux-state-updaters';

const actionHandler = {
  [ActionTypes.SET_LOADING]: auxStateUpdaters.setLoadingUpdater,
  [ActionTypes.SET_ERROR]: auxStateUpdaters.setErrorUpdater,
};

export default handleActions(actionHandler, auxStateUpdaters.INITIAL_AUX_STATE);
