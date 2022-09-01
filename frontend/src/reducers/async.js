import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
} from "../actions/types";

const initialState = {
  loading: false,
};

function asyncReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case ASYNC_ACTION_START:
      return { ...state, loading: true };
    case ASYNC_ACTION_FINISH:
      return { ...state, loading: false };
    case ASYNC_ACTION_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
}

export default asyncReducer;
