import {
  ASYNC_ACTION_ERROR,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_START,
} from "./types";
export const asyncActionStart = () => async (dispatch) => {
  dispatch({
    type: ASYNC_ACTION_START,
  });
};

export const asyncActionFinish = () => async (dispatch) => {
  dispatch({
    type: ASYNC_ACTION_FINISH,
  });
};

export const asyncActionError = () => async (dispatch) => {
  dispatch({
    type: ASYNC_ACTION_ERROR,
  });
};
