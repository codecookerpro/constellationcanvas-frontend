import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authStateReducer from './auth-state';
import mainReducer from './main-state';

const reducers = combineReducers({
  auth: authStateReducer,
  routing: routerReducer,
  main: mainReducer,
});

export default reducers;
