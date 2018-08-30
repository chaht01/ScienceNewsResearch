import { types as actionType } from "../Actions/answerHighlight";

const initialState = {
  loading: false,
  error: null,
  data: [], // Question Instance Array
  inProgress: {
    active: false,
    article_id: -1,
    shown: null,
    data: [],
    loading: false,
    error: null
  },
  hover: {
    sentence_id: null
  }
};

const answerHighlightReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ANSWER_HIGHLIGHT_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionType.ANSWER_HIGHLIGHT_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case actionType.ANSWER_HIGHLIGHT_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case actionType.ANSWER_HIGHLIGHT_MODE_ACTIVATE:
      const { article_id, shown } = action.payload;
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          article_id,
          shown,
          data: [
            ...shown.takes
              .reduce((a, b) => (a.id < b.id ? b : a))
              .answertexts.map(at => at.sentence)
          ], // TODO: BIT DIFFERENT POINT TO QUESTIONHIGHLIHGT REDUCER
          active: true
        },
        hover: {
          ...state.hover,
          sentence_id: null
        }
      };
    case actionType.ANSWER_HIGHLIGHT_MODE_UNDO:
      return {
        ...state,
        inProgress: {
          ...initialState.inProgress
        },
        hover: {
          ...initialState.hover
        }
      };
    case actionType.ANSWER_HIGHLIGHT_MARK:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          data: [...state.inProgress.data, action.payload.sentence_id]
        }
      };
    case actionType.ANSWER_HIGHLIGHT_ERASE:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          data: state.inProgress.data.filter(
            s_id => s_id !== action.payload.sentence_id
          )
        }
      };
    case actionType.ANSWER_HIGHLIGHT_SAVE_REQUEST:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          loading: true
        }
      };
    case actionType.ANSWER_HIGHLIGHT_SAVE_SUCCESS:
      return {
        ...state,
        inProgress: {
          ...initialState.inProgress
        }
      };
    case actionType.ANSWER_HIGHLIGHT_SAVE_FAILURE:
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          loading: false,
          error: action.payload
        }
      };
    case actionType.ANSWER_HIGHLIGHT_HOVER_ENTER:
      return {
        ...state,
        hover: {
          ...state.hover,
          sentence_id: action.payload.sentence_id
        }
      };
    case actionType.ANSWER_HIGHLIGHT_HOVER_LEAVE:
      return {
        ...state,
        hover: {
          ...state.hover,
          sentence_id: null
        }
      };

    default:
      return state;
  }
};

export default answerHighlightReducer;
