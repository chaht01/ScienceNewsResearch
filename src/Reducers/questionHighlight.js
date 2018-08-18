import { types as actionType } from "../Actions/questionHighlight";

const initialState = {
  loading: false,
  error: null,
  data: [], // Question Instance Array
  inProgress: {
    active: false,
    article_id: -1,
    question_id: -1,
    data: [],
    loading: false,
    error: null
  },
  hover: {
    question_ids: []
  }
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
      const { article_id, question_id } = action.payload;
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          article_id,
          question_id,
          data:
            state.data.filter(q => q.id === question_id).length === 0
              ? []
              : state.data.filter(q => q.id === question_id)[0].refText,
          active: true
        },
        hover: {
          ...state.hover,
          question_ids: []
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
          question_ids: state.hover.question_ids.concat(
            action.payload.question_ids.filter(
              q => state.hover.question_ids.indexOf(q) < 0
            )
          )
        }
      };
    case actionType.QUESTION_HIGHLIGHT_HOVER_LEAVE:
      return {
        ...state,
        hover: {
          ...state.hover,
          question_ids: state.hover.question_ids.filter(
            q => action.payload.question_ids.indexOf(q) < 0
          )
        }
      };

    default:
      return state;
  }
};

export default questionHighlightReducer;
