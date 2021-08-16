import { USER_ROLES } from 'constants/enums';

export const INITIAL_AUTH_STATE = {
  profile: {
    role: USER_ROLES.unknown,
  },
  accessToken: null,
  users: [],
};

export const setUserInfoUpdater = (state, { payload: { profile, accessToken } }) => ({
  ...state,
  profile: profile || state.profile,
  accessToken: accessToken || state.accessToken,
});

export const setUsersUpdater = (state, { payload: users }) => ({
  ...state,
  users,
});
