import api from "../utils/api";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "./async";
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import CartActionTypes from "../types/cart";
import { toast } from "react-toastify";
// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth/user");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());
    const res = await api.post("/auth/signup-user", formData);
    dispatch(asyncActionFinish());

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    toast.success("User register successfully!");
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch(asyncActionError());
    if (errors) {
      errors.forEach((error) => dispatch(toast.error(error.msg)));
    }
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    dispatch(asyncActionStart());
    const res = await api.post("/auth/login-user", body);
    dispatch(asyncActionFinish());

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(asyncActionError());
    if (errors) {
      errors.forEach((error) => dispatch(toast.error(error.msg)));
    }
  }
};

// Login Admin
export const loginAdmin = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    dispatch(asyncActionStart());
    const res = await api.post("/auth/login-admin", body);
    dispatch(asyncActionFinish());

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(asyncActionError());
    if (errors) {
      errors.forEach((error) => dispatch(toast.error(error.msg)));
    }
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });

// update User
export const updateUser = (name, password) => async (dispatch) => {
  const body = { name, password };

  try {
    dispatch(asyncActionStart());
    await api.put("/auth/edit-user", body);
    dispatch(asyncActionFinish());

    toast.success("Updated Successfully");

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(toast.error(error.msg)));
    }
    dispatch(asyncActionError());
  }
};

// checkOut
export const checkOut = (total, ads) => async (dispatch) => {
  const body = { total, ads };
  // console.log(body)
  try {
    dispatch(asyncActionStart());
    await api.post("/auth/checkout", body);
    dispatch(asyncActionFinish());

    toast.success("Payment Successfully Done!");
    dispatch({
      type: CartActionTypes.EMPTY_CART,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch(asyncActionFinish());
    if (errors) {
      errors.forEach((error) => dispatch(toast.error(error.msg)));
    }
  }
};
