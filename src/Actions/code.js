import { typeStringCreator } from "./creator";

export const types = {
  CODE_FETCH_REQUEST: typeStringCreator("CODE_FETCH_REQUEST"),
  CODE_FETCH_SUCCESS: typeStringCreator("CODE_FETCH_SUCCESS"),
  CODE_FETCH_FAILURE: typeStringCreator("CODE_FETCH_FAILURE")
};

export const codeFetchRequest = () => {
  return {
    type: types.CODE_FETCH_REQUEST
  };
};

export const codeFetchSuccess = codes => {
  return {
    type: types.CODE_FETCH_SUCCESS,
    payload: codes
  };
};

export const codeFetchFailure = error => {
  return {
    type: types.CODE_FETCH_FAILURE,
    payload: error
  };
};
