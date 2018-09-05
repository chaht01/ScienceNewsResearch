import { types as actionType } from "../Actions/questionHighlight";

export const TabNames = ["Your questions", "Others' questions"];

const initialState = {
  loading: false,
  error: null,
  data: [], // Question Instance Array
  inProgress: {
    active: false,
    article_id: -1,
    question: null,
    data: [],
    loading: false,
    error: null
  },
  hover: {
    sentence_id: null
  },
  activeTabIdx: 0,
  _tabNames: TabNames //just use for reference
};

const questionHighlightReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.QUESTION_HIGHLIGHT_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionType.QUESTION_HIGHLIGHT_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case actionType.QUESTION_HIGHLIGHT_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case actionType.QUESTION_HIGHLIGHT_MODE_ACTIVATE:
      const { article_id, question } = action.payload;
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          article_id,
          question,
          data:
            question === null
              ? []
              : question.reftexts.map(reftext => reftext.sentence),
          active: true
        },
        hover: {
          ...state.hover,
          sentence_id: null
        }
      };
    case actionType.QUESTION_HIGHLIGHT_MODE_UNDO:
      return {
        ...state,
        inProgress: {
          ...initialState.inProgress
        },
        hover: {
          ...initialState.hover
        }
      };
    case actionType.QUESTION_HIGHLIGHT_MARK:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          data: [...state.inProgress.data, action.payload.sentence_id]
        }
      };
    case actionType.QUESTION_HIGHLIGHT_ERASE:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          data: state.inProgress.data.filter(
            s_id => s_id !== action.payload.sentence_id
          )
        }
      };
    case actionType.QUESTION_HIGHLIGHT_SAVE_REQUEST:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          loading: true
        }
      };
    case actionType.QUESTION_HIGHLIGHT_SAVE_SUCCESS:
      return {
        ...state,
        inProgress: {
          ...initialState.inProgress
        }
      };
    case actionType.QUESTION_HIGHLIGHT_SAVE_FAILURE:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          loading: false,
          error: action.payload
        }
      };
    case actionType.QUESTION_HIGHLIGHT_HOVER_ENTER:
      return {
        ...state,
        hover: {
          ...state.hover,
          sentence_id: action.payload.sentence_id
        }
      };
    case actionType.QUESTION_HIGHLIGHT_HOVER_LEAVE:
      return {
        ...state,
        hover: {
          ...state.hover,
          sentence_id: null
        }
      };
    case actionType.QUESTION_HIGHLIGHT_ACTIVE_TAB:
      if (TabNames.length > action.payload.activeTabIdx) {
        return {
          ...state,
          activeTabIdx: action.payload.activeTabIdx
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default questionHighlightReducer;
