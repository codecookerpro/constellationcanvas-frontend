import { createAction } from 'redux-actions';
import { handleError } from './error';
import ActionTypes from 'constants/action-types';
import * as API from 'services/auth';

export const inviteToAccessToken = (params) => (dispatch) => {
  API.inviteToAccessToken(params)
    .then(({ data, accessToken }) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('profile', JSON.stringify(data));

      dispatch(setUserInfo(accessToken, data));
    })
    .catch((error) => dispatch(handleError(error)));
};

export const setUserInfo = createAction(ActionTypes.SET_USER_INFO, (accessToken, profile) => ({ profile, accessToken }));
