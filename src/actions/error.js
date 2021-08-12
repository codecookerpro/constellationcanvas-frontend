import ActionTypes from 'constants/action-types';
import { createAction } from 'redux-actions';

export const handleError = createAction(ActionTypes.HANDLE_ERROR, (payload) => payload);
