import { types as actionType } from "../Actions/page";

const THRESHOLD = 2;

const initialState = {
  loading: false,
  data: 0
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PAGE_NEXT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actionType.PAGE_NEXT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: Math.min(state.data + 1, THRESHOLD)
      };
    case actionType.PAGE_NEXT_FAILURE:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default pageReducer;
