import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authStateReducer from './auth-state';

const reducers = combineReducers({
  auth: authStateReducer,
  routing: routerReducer,
});

export default reducers;
