import { typeStringCreator } from "./creator";

export const types = {
  ARTICLE_FETCH_REQUEST: typeStringCreator("ARTICLE_FETCH_REQUEST"),
  ARTICLE_FETCH_SUCCESS: typeStringCreator("ARTICLE_FETCH_SUCCESS"),
  ARTICLE_FETCH_FAILURE: typeStringCreator("ARTICLE_FETCH_FAILURE")
};

// ARTICLE FETCHING
export const articleArticleFetchRequest = id => {
  return {
    type: types.ARTICLE_FETCH_REQUEST,
    payload: {
      id
    }
  };
};

export const articleArticleFetchSuccess = article => {
  return {
    type: types.ARTICLE_FETCH_SUCCESS,
    payload: article
  };
};

export const articleArticleFetchFailure = error => {
  return {
    type: types.ARTICLE_FETCH_FAILURE,
    payload: error
  };
};
