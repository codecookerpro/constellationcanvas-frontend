import { handleActions } from 'redux-actions';
import * as authStateUpdaters from './auth-state-updaters';

const actionHandler = {};

export default handleActions(actionHandler, authStateUpdaters.INITIAL_AUTH_STATE);
