import { types as actionType } from "../Actions/poolExample";
import { question_code } from "../config/var/question";

const initialState = {
  items: question_code,
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
    default:
      return state;
  }
};

export default poolExampleReducer;
