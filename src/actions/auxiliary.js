import ActionTypes from 'constants/action-types';
import { createAction } from 'redux-actions';

export const setLoading = createAction(ActionTypes.SET_LOADING, (payload) => payload);
