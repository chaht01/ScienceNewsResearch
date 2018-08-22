import { types as actionType } from "../Actions/highlight";
import { types as takeActionType } from "../Actions/take";

const initialState = {
  loading: false,
  error: null,
  data: [],
  inProgress: {
    active: false,
    take_id: -1,
    article_id: -1,
    question_id: -1,
    data: [],
    loading: false,
    error: null
  },
  hover: {
    sentence_id: null
  }
};

const highlightReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.HIGHLIGHT_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionType.HIGHLIGHT_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case actionType.HIGHLIGHT_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case actionType.HIGHLIGHT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionType.HIGHLIGHT_CREATE_SUCCESS:
      return {
        ...state,
        data: state.data.slice().concat(action.payload),
        loading: false,
        error: null
      };
    case actionType.HIGHLIGHT_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case actionType.HIGHLIGHT_DELETE_REQUEST:
      return {
        ...state,
        data: state.data.map(highlight => {
          if (
            highlight.article_id !== action.payload.article_id ||
            highlight.question_id !== action.payload.question_id ||
            highlight.sentence_id !== action.payload.sentence_id
          ) {
            return highlight;
          }
          return {
            ...highlight,
            loading: true,
            error: null
          };
        })
      };
    case actionType.HIGHLIGHT_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(highlight => {
          if (
            highlight.article_id !== action.payload.article_id ||
            highlight.question_id !== action.payload.question_id ||
            highlight.sentence_id !== action.payload.sentence_id
          ) {
            return true;
          }
          return false;
        })
      };
    case actionType.HIGHLIGHT_DELETE_FAILURE:
      return {
        ...state,
        data: state.data.map(highlight => {
          if (highlight.id !== action.payload.id) {
            return highlight;
          }
          return {
            ...highlight,
            loading: false,
            error: action.payload
          };
        })
      };
    case actionType.HIGHLIGHT_MODE_ACTIVATE:
      const { article_id, question_id, take_id, responses } = action.payload;
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          article_id,
          question_id,
          take_id,
          data: responses.filter(r => r.sentence !== null).map(r => r.sentence),
          active: true
        },
        hover: {
          ...state.hover,
          sentence_ids: []
        }
      };
    case actionType.HIGHLIGHT_MODE_UNDO:
      return {
        ...state,
        inProgress: {
          ...initialState.inProgress
        },
        hover: {
          ...initialState.hover
        }
      };
    case actionType.HIGHLIGHT_MARK:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          data: [...state.inProgress.data, action.payload.sentence_id]
        }
      };
    case actionType.HIGHLIGHT_ERASE:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          data: state.inProgress.data.filter(
            s_id => s_id !== action.payload.sentence_id
          )
        }
      };
    case actionType.HIGHLIGHT_SAVE_REQUEST:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          loading: true
        }
      };
    case actionType.HIGHLIGHT_SAVE_SUCCESS:
      return {
        ...state,
        inProgress: {
          ...initialState.inProgress
        }
      };
    case actionType.HIGHLIGHT_SAVE_FAILURE:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          loading: false,
          error: action.payload
        }
      };
    case actionType.HIGHLIGHT_HOVER_ENTER:
      return {
        ...state,
        hover: {
          ...state.hover,
          sentence_id: action.payload.sentence_id
        }
      };
    case actionType.HIGHLIGHT_HOVER_LEAVE:
      return {
        ...state,
        hover: {
          ...state.hover,
          sentence_id: null
        }
      };
    case takeActionType.TAKE_DELETE_SUCCESS:
      return {
        ...state,
        hover: {
          ...state.hover,
          sentence_ids: state.hover.sentence_ids.filter(
            q => q !== action.payload.question
          )
        }
      };
    default:
      return state;
  }
};

export default highlightReducer;
