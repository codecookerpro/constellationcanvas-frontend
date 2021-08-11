import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authStateReducer from './auth-state';
import mainReducer from './main-state';
import profileReducer from './profile-state';

const reducers = combineReducers({
  auth: authStateReducer,
  routing: routerReducer,
  main: mainReducer,
  profile: profileReducer,
});

export default reducers;
