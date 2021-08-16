export const INITIAL_AUX_STATE = {
  loading: false,
};

export const setLoadingUpdater = (state, { payload }) => ({
  ...state,
  loading: payload,
});
