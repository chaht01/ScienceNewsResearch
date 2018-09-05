import { findIndex as _findIndex } from "lodash";
import { types as actionType } from "../Actions/questionModal";
import { types as codeActionType } from "../Actions/code";
const STEP_THRESHOLD = 1;
//edit --> delete and recreate.
const initialState = {
  step: 0,
  openInstance: null,

  typed: "",
  codes: [], //Immutable. just for reference
  code_first_id: -1,
  code_second_id: -1,
  intention: "",

  group_inquries: {
    loading: false,
    data: [],
    scores: {},
    error: null,
    updateLoading: false,
    updateError: null
  },

  loading: false, //submission
  error: null
};

const questionModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case codeActionType.CODE_FETCH_SUCCESS:
      return {
        ...state,
        codes: action.payload
      };
    case actionType.QUESTION_MODAL_OPEN:
      return {
        ...state,
        openInstance: action.payload
      };
    case actionType.QUESTION_MODAL_CLOSE:
      return {
        ...state,
        openInstance: null
      };
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
    case actionType.QUESTION_MODAL_CHANGE_CODE_FIRST:
      return {
        ...state,
        code_first_id: action.payload
      };
    case actionType.QUESTION_MODAL_CHANGE_CODE_SECOND:
      return {
        ...state,
        code_second_id: action.payload
      };
    case actionType.QUESTION_MODAL_FETCH_INQUIRIES_REQUEST:
      return {
        ...state,
        group_inquries: {
          ...state.group_inquries,
          data: [],
          error: null,
          loading: true
        }
      };
    case actionType.QUESTION_MODAL_FETCH_INQUIRIES_SUCCESS:
      return {
        ...state,
        step: 1,
        group_inquries: {
          ...state.group_inquries,
          data: action.payload,
          loading: false
        }
      };
    case actionType.QUESTION_MODAL_FETCH_INQUIRIES_FAILURE:
      return {
        ...state,
        group_inquries: {
          ...state.group_inquries,
          error: action.payload,
          loading: false
        }
      };
    case actionType.QUESTION_MODAL_CLEAR_INQUIRIES:
      return {
        ...state,
        group_inquries: {
          ...initialState.group_inquries
        }
      };

    case actionType.QUESTION_MODAL_UPDATE_INQUIRY:
      return {
        ...state,
        group_inquries: {
          ...state.group_inquries,
          scores: {
            ...state.group_inquries.scores,
            [action.payload.inquiry_id]: action.payload.score
          }
        }
      };

    case actionType.QUESTION_MODAL_UPDATE_INQUIRY_ASYNC_REQUEST:
      return {
        ...state,
        group_inquries: {
          ...state.group_inquries,
          updateLoading: true
        }
      };

    case actionType.QUESTION_MODAL_UPDATE_INQUIRY_ASYNC_FAILURE:
      return {
        ...state,
        group_inquries: {
          ...state.group_inquries,
          updateLoading: false,
          updateError: action.payload
        }
      };
    case actionType.QUESTION_MODAL_CRUD_SUBMIT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actionType.QUESTION_MODAL_CRUD_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case actionType.QUESTION_MODAL_CRUD_SUBMIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default questionModalReducer;
