import { typeStringCreator } from "./creator";

export const types = {
  AUTH_SIGNUP_REQUEST: typeStringCreator("AUTH_SIGNUP_REQUEST"),
  AUTH_SIGNUP_SUCCESS: typeStringCreator("AUTH_SIGNUP_SUCCESS"),
  AUTH_SIGNUP_FAILURE: typeStringCreator("AUTH_SIGNUP_FAILURE"),
  AUTH_LOGIN_REQUEST: typeStringCreator("AUTH_LOGIN_REQUEST"),
  AUTH_LOGIN_SUCCESS: typeStringCreator("AUTH_LOGIN_SUCCESS"),
  AUTH_LOGIN_FAILURE: typeStringCreator("AUTH_LOGIN_FAILURE"),
  AUTH_LOGOUT: typeStringCreator("AUTH_LOGOUT"),
  AUTH_UNAUTHORIZED: typeStringCreator("AUTH_UNAUTHORIZED"),
  AUTH_VERIFY: typeStringCreator("AUTH_VERIFY")
};

export const signupRequested = ({ username, password, research_id }) => {
  return {
    type: types.AUTH_SIGNUP_REQUEST,
    payload: {
      username,
      password,
      research_id
    }
  };
};

export const signupSuccess = user_detail => {
  delete user_detail["password"];
  return {
    type: types.AUTH_SIGNUP_SUCCESS,
    payload: user_detail
  };
};

export const signupFailure = error => {
  return {
    type: types.AUTH_SIGNUP_FAILURE,
    payload: error
  };
};

export const loginRequested = ({ username, password }) => {
  return {
    type: types.AUTH_LOGIN_REQUEST,
    payload: {
      username,
      password
    }
  };
};

export const loginSuccess = token => {
  return {
    type: types.AUTH_LOGIN_SUCCESS,
    payload: {
      token
    }
  };
};

export const loginFail = error => {
  return {
    type: types.AUTH_LOGIN_FAILURE,
    payload: error
  };
};

export const logout = () => {
  return {
    type: types.AUTH_LOGOUT
  };
};

export const authVerify = (username, token) => {
  return {
    type: types.AUTH_VERIFY,
    payload: {
      token,
      username
    }
  };
};

export const unauthorized = requestStack => {
  return {
    type: types.AUTH_UNAUTHORIZED,
    payload: {
      requestStack
    }
  };
};
