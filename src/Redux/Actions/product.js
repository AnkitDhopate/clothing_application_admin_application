import { productConstants } from "../Constants/constants";
import axios from "../Axios/axios";

export const getAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });

    const res = await axios.get(`/product/getallproducts`);

    if (res.status == 201) {
      const { productsList } = res.data;
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCCESS,
        payload: {
          products: productsList,
        },
      });
    } else {
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const createProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.CREATE_NEW_PRODUCT_REQUEST });

    try {
      const res = await axios.post(`/product/create`, form);

      if (res.status == 200) {
        dispatch({
          type: productConstants.CREATE_NEW_PRODUCT_SUCCESS,
          payload: { category: res.data.createdProduct },
        });
      } else {
        dispatch({
          type: productConstants.CREATE_NEW_PRODUCT_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteProducts = (ids) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.DELETE_PRODUCTS_REQUEST });

    try {
      const res = await axios.post(`/product/delete`, { payload: { ids } });

      if (res.status == 201) {
        dispatch(getAllProducts());
        dispatch({ type: productConstants.DELETE_PRODUCTS_SUCCESS });
      } else {
        const { error } = res.data;
        dispatch({ type: productConstants.DELETE_PRODUCTS_FAILURE, error });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
