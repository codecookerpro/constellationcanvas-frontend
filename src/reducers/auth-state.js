import ActionTypes from 'constants/action-types';
import { handleActions } from 'redux-actions';
import * as authStateUpdaters from './auth-state-updaters';

const actionHandler = {
  [ActionTypes.SET_USER_INFO]: authStateUpdaters.setUserInfoUpdater,
};

export default handleActions(actionHandler, authStateUpdaters.INITIAL_AUTH_STATE);
