import { createSelector } from "reselect";

const selectAsync = (state) => state.async;

export const selectLoading = createSelector(
  [selectAsync],
  (async) => async.loading
);
