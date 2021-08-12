export const INITIAL_AUTH_STATE = {
  profile: null,
  accessToken: null,
};

export const setUserInfoUpdater = (state, { payload: { profile, accessToken } }) => ({
  ...state,
  profile,
  accessToken,
});
