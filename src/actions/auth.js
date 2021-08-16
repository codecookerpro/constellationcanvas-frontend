import { createAction } from 'redux-actions';
import { handleError } from './error';
import ActionTypes from 'constants/action-types';
import * as API from 'services/auth';
import { setLoading } from './auxiliary';

export const inviteToAccessToken = (params) => (dispatch) => {
  dispatch(setLoading(true));

  API.inviteToAccessToken(params)
    .then(({ data, accessToken }) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('profile', JSON.stringify(data));

      dispatch(setUserInfo(accessToken, data));
      dispatch(setLoading(false));
    })
    .catch((error) => dispatch(handleError(error)));
};

export const updateUser = (userUUID, params) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const {
    users,
    profile: { uuid: currentUser },
  } = getState().auth;
  API.updateUser(userUUID, params).then((data) => {
    if (userUUID === currentUser) {
      localStorage.setItem('profile', JSON.stringify(data));
      dispatch(setUserInfo(null, data));
    }

    dispatch(setUsers(users.map((u) => (u.uuid === userUUID ? data : u))));
    dispatch(setLoading(false));
  });
};

export const inviteUser = (email) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const {
    users,
    profile: { boardUUID },
  } = getState().auth;
  API.inviteUser({ email, boardUUID })
    .then((data) => {
      dispatch(setUsers([...users, data]));
      dispatch(setLoading(false));
    })
    .catch((error) => dispatch(handleError(error)));
};

export const getUsers = () => (dispatch, getState) => {
  dispatch(setLoading(true));

  const { boardUUID, uuid } = getState().auth.profile;
  API.getUsers({ boardUUID })
    .then(({ results }) => {
      dispatch(setUsers(results.filter((u) => u.uuid !== uuid)));
      dispatch(setLoading(false));
    })
    .catch((error) => dispatch(handleError(error)));
};

export const resendCode = (userUUID) => (dispatch) => {
  API.resendCode(userUUID).catch((error) => dispatch(handleError(error)));
};

export const getInviteCode = (userUUID) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const users = getState().auth.users;
  API.getInviteCode(userUUID)
    .then((data) => {
      dispatch(setUsers(users.map((u) => (u.uuid === userUUID ? data : u))));
      dispatch(setLoading(false));
    })
    .catch((error) => dispatch(handleError(error)));
};

export const setUserInfo = createAction(ActionTypes.SET_USER_INFO, (accessToken, profile) => ({ profile, accessToken }));
export const setUsers = createAction(ActionTypes.SET_USERS, (payload) => payload);
