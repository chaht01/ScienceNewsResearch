import { types as actionType } from "../Actions/poolExample";
import { types as codeActionType } from "../Actions/code";

const initialState = {
  items: [],
  data: {
    selected: 0
  }
};

const poolExampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.EXAMPLE_FILTER_SELECT:
      return {
        ...state,
        data: {
          ...state,
          selected: action.payload.idx
        }
      };
    case codeActionType.CODE_FETCH_SUCCESS:
      return {
        ...state,
        items: action.payload.map(code => code.text)
      };
    default:
      return state;
  }
};

export default poolExampleReducer;
