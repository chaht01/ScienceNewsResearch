import { types as actionType } from "../Actions/auth";

const initialState = {
  isAuthenticated: false,
  loading: false,
  token: "",
  signup: {
    loading: false,
    error: null,
    data: null
  },
  redirectToReferrer: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_SIGNUP_REQUEST:
      return {
        ...state,
        error: null,
        signup: {
          ...state.signup,
          loading: true,
          error: null
        }
      };
    case actionType.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          ...state.signup,
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case actionType.AUTH_SIGNUP_FAILURE:
      return {
        ...state,
        signup: {
          ...state.signup,
          loading: false,
          data: null,
          error: action.payload
        }
      };
    case actionType.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        signup: {
          ...state.signup,
          error: null
        }
      };
    case actionType.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        redirectToReferrer: true,
        error: null
      };
    case actionType.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        token: "",
        redirectToReferrer: true
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: "",
        redirectToReferrer: false,
        error: null
      };
    case actionType.AUTH_UNAUTHORIZED:
      return {
        ...state,
        loading: false,
        token: "",
        redirectToReferrer: false,
        error: null
      };
    case actionType.AUTH_VERIFY:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default authReducer;
