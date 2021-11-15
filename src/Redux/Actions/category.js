import axios from "../Axios/axios";
import { categoryConstants } from "../Constants/constants";

export const getAllCategories = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.GET_ALL_CATEGORIES_REQUEST,
    });

    const res = await axios.get(`/category/getcategory`);

    if (res.status == 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: {
          categories: categoryList,
        },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const addNewCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });

    try {
      const res = await axios.post(`/category/create`, form);

      if (res.status == 200) {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.createdCategory },
        });
      } else {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST });

    try {
      const res = await axios.post(`/category/delete`, { payload: { ids } });

      if (res.status == 201) {
        dispatch(getAllCategories());
        dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS });
      } else {
        const { error } = res.data;
        dispatch({ type: categoryConstants.DELETE_CATEGORIES_FAILURE, error });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
