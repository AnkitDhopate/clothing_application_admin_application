import { authConstants } from "../Constants/constants";
import { api } from "../urlConfig";
import axios from "../Axios/axios";

export const adminLogin = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.USER_AUTH_REQUEST });
    const res = await axios.post(`/admin/signin`, { ...user });

    if (res.status == 200) {
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: authConstants.USER_AUTH_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.USER_AUTH_FAILURE,
        payload: {
          error: "error",
        },
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));

      dispatch({
        type: authConstants.USER_AUTH_SUCCESS,
        payload: { token, user },
      });
    } else {
      dispatch({
        type: authConstants.USER_AUTH_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.USER_LOGOUT_REQUEST });

    const res = await axios.post(`/admin/logout`);

    if (res.status == 200) {
      localStorage.clear();
      dispatch({
        type: authConstants.USER_LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstants.USER_LOGOUT_FAILURE,
        payload: { error: "error" },
      });
    }
  };
};
