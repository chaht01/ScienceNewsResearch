import { types as actionType } from "../Actions/article";

const initialState = {
  loading: false,
  error: null,
  data: null
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ARTICLE_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionType.ARTICLE_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case actionType.ARTICLE_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default articleReducer;
