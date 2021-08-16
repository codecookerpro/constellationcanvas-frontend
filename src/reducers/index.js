import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authStateReducer from './auth-state';
import mainStateReducer from './main-state';
import auxStateReducer from './aux-state';

const reducers = combineReducers({
  auth: authStateReducer,
  routing: routerReducer,
  main: mainStateReducer,
  aux: auxStateReducer,
});

export default reducers;
