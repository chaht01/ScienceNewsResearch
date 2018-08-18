import { findIndex as _findIndex } from "lodash";
import { types as actionType } from "../Actions/questionModal";
import {
  question_code,
  question_code_serializer
} from "../config/var/question";
const STEP_THRESHOLD = 1;
//edit --> delete and recreate.
const codes = question_code
  .map(code => ({
    label: question_code_serializer[code],
    code
  }))
  .concat([{ label: "Does not fit into any", code: "warning" }]);
const initialState = {
  step: 0,

  typed: "",
  codes,
  codeIdx: -1,
  intention: "",

  group_inquries: {
    loading: false,
    data: [],
    error: null
  }
};

const questionModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.QUESTION_MODAL_NEXT:
      return {
        ...state,
        step: Math.min(action.payload, STEP_THRESHOLD)
      };
    case actionType.QUESTION_MODAL_TYPE_QUESTION:
      return {
        ...state,
        typed: action.payload.typed
      };
    case actionType.QUESTION_MODAL_TYPE_INTENTION:
      return {
        ...state,
        intention: action.payload.typed
      };
    case actionType.QUESTION_MODAL_CHANGE_CODE:
      return {
        ...state,
        codeIdx: _findIndex(state.codes, action.payload)
      };
    case actionType.QUESTION_MODAL_FETCH_INQUIRIES:
      return {
        ...state,
        group_inquries: {
          ...state.group_inquries,
          data: [],
          error: null,
          loading: true
        }
      };

    default:
      return state;
  }
};

export default questionModalReducer;
