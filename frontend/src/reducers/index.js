import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import asyncReducer from "./async";
import ad from "./ad";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./cart";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  alert,
  auth,
  async: asyncReducer,
  ad,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
