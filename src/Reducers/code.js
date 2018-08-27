import { types as actionType } from "../Actions/code";
const initialState = {
  loading: false,
  data: [],
  error: null
};

const codeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CODE_FETCH_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };

    case actionType.CODE_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: false
      };

    case actionType.CODE_FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default codeReducer;
