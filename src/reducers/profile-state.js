import { handleActions } from 'redux-actions';
import * as profileStateUpdaters from './profile-state-updaters';

const actionHandler = {};

export default handleActions(actionHandler, profileStateUpdaters.INITIAL_PROFILE_STATE);
