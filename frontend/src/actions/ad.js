import api from "../utils/api";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "./async";
import { GET_POSTS, GET_POST, DELETE_POST } from "./types";
import { toast } from "react-toastify";

export const adCreate = (formData) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());
    await api.post("/post/create", formData);
    dispatch(asyncActionFinish());
    toast.success("Ad Created successfully!");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(toast.error(error.msg)));
    }
    dispatch(asyncActionError());
  }
};

export const getAllAds = () => async (dispatch) => {
  try {
    const res = await api.get("/post/all");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleAd = (id) => async (dispatch) => {
  console.log(id);
  try {
    const res = await api.get(`/post/post-by-id/${id}`);
    console.log(res);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteSingleAd = (id) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());
    await api.delete(`/post/delete-post/${id}`);
    dispatch(asyncActionFinish());

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    toast.success("Ad deleted successfully!");
  } catch (error) {
    console.log(error);
    dispatch(asyncActionFinish());
  }
};

export const editSingleAd = (body, id) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());
    await api.put(`/post/update-post/${id}`, body);
    dispatch(asyncActionFinish());
    toast.success("Ad Updated successfully!");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(toast.error(error.msg)));
    }
    dispatch(asyncActionError());
  }
};
