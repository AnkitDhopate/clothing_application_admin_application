import { authConstants } from "../Constants/constants";

const initState = {
  token: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    fullName: "",
    userName: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: "",
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.USER_AUTH_REQUEST:
      state = { ...state, authenticating: true, loading: true };
      break;

    case authConstants.USER_AUTH_SUCCESS:
      state = {
        ...state,
        authenticating: false,
        authenticate: true,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
      break;

    case authConstants.USER_AUTH_FAILURE:
      state = {
        ...state,
        authenticating: false,
        authenticate: false,
        loading: false,
        error: action.payload.error,
      };

    case authConstants.USER_LOGOUT_REQUEST:
      state = { ...state, loading: true };
      break;

    case authConstants.USER_LOGOUT_SUCCESS:
      state = { ...initState, loading: false };

    case authConstants.USER_LOGOUT_FAILURE:
      state = { ...initState, error: "error", loading: false };
  }
  return state;
};
