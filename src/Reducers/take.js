import { types as actionType } from "../Actions/take";
import { types as highlightActionType } from "../Actions/highlight";
import { isEqual } from "lodash";
const initialState = {
  loading: false,
  error: null,
  data: [], // remote stage
  inProgress: {
    // local stage
    data: [],
    loading: false,
    error: null
  }
};

const takeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TAKE_LIST_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionType.TAKE_LIST_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.map(question => ({
          ...question,
          loading: false, // For async purpose
          error: false // For async purpose
          // Or other field you want
        })),
        inProgress: {
          ...initialState.inProgress,
          data: action.payload.map(remote => ({
            article_id: remote.article,
            question_id: remote.question,
            phase: remote.phase
          }))
        },
        error: null
      };
    case actionType.TAKE_LIST_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actionType.TAKE_MARK:
      return {
        ...state,
        inProgress: {
          data: [...state.inProgress.data, action.payload]
        }
      };
    case actionType.TAKE_ERASE:
      return {
        ...state,
        inProgress: {
          data: state.inProgress.data.filter(
            take => !isEqual(take, action.payload)
          )
        }
      };
    case actionType.TAKE_CREATE_REQUEST:
      return {
        ...state,
        loading: false,
        error: null
      };
    case actionType.TAKE_CREATE_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
        error: null
      };
    case actionType.TAKE_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case actionType.TAKE_DELETE_REQUEST:
      return {
        ...state,
        data: state.data.map(take => {
          if (take.id !== action.payload.id) {
            return take;
          }
          return {
            ...take,
            loading: true,
            error: null
          };
        })
      };
    case actionType.TAKE_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(take => take.id !== action.payload.id),
        inProgress: {
          data: state.inProgress.data.filter(
            take => take.question_id !== action.payload.question
          )
        }
      };
    case actionType.TAKE_DELETE_FAILURE:
      return {
        ...state,
        data: state.data.map(take => {
          if (take.id !== action.payload.id) {
            return take;
          }
          return {
            ...take,
            loading: false,
            error: action.payload
          };
        })
      };

    case actionType.TAKE_RESPONSE_UPDATE_SUCCESS: // payload{Milestone}
    case highlightActionType.HIGHLIGHT_SAVE_SUCCESS:
      return {
        ...state,
        data: state.data.map(take => {
          if (take.id === action.payload.take) {
            take.milestones = [...take.milestones, action.payload];
          }
          return take;
        })
      };
    default:
      return state;
  }
};

export default takeReducer;
