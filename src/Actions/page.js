import { typeStringCreator } from "./creator";

export const types = {
  // async depends other actions
  PAGE_NEXT_REQUEST: typeStringCreator("PAGE_NEXT_REQUEST"),
  PAGE_NEXT_SUCCESS: typeStringCreator("PAGE_NEXT_SUCCESS"),
  PAGE_NEXT_FAILURE: typeStringCreator("PAGE_NEXT_FAILURE")
};

// PAGE NEXT
export const pageNextRequest = (page, actionsBindParams) => {
  return {
    type: types.PAGE_NEXT_REQUEST,
    payload: {
      page,
      actionsBindParams
    }
  };
};

export const pageNextSuccess = page => {
  return {
    type: types.PAGE_NEXT_SUCCESS,
    payload: {
      page
    }
  };
};

export const pageNextFailure = () => {
  return {
    type: types.PAGE_NEXT_FAILURE
  };
};
