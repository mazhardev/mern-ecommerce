import { createSelector } from "reselect";

const selectState = (state) => state;

export const selectAuthItem = createSelector(
  [selectState],
  (state) => state.auth
);
