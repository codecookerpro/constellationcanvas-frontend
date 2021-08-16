import { createAction } from 'redux-actions';
import { handleError } from './error';
import ActionTypes from 'constants/action-types';
import * as API from 'services/auth';
import { setLoading } from './auxiliary';

export const inviteToAccessToken = (params) => (dispatch) => {
  API.inviteToAccessToken(params)
    .then(({ data, accessToken }) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('profile', JSON.stringify(data));

      dispatch(setUserInfo(accessToken, data));
      dispatch(setLoading(false));
    })
    .catch((error) => dispatch(handleError(error)));
};

export const updateOwnProfile = (params) => (dispatch, getState) => {
  const { uuid } = getState().auth.profile;
  API.updateOwnProfile(uuid, params).then((data) => {
    localStorage.setItem('profile', JSON.stringify(data));
    dispatch(setUserInfo(null, data));
    dispatch(setLoading(false));
  });
};

export const setUserInfo = createAction(ActionTypes.SET_USER_INFO, (accessToken, profile) => ({ profile, accessToken }));
