import { types as actionType } from "../Actions/question";

const initialState = {
  loading: false,
  error: null,
  data: []
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.POOL_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionType.POOL_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.map(question => ({
          ...question,
          loading: false, // For async purpose
          error: false // For async purpose
          // Or other field you want
        })),
        error: null
      };
    case actionType.POOL_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case actionType.QUESTION_CREATE_REQUEST:
      return {
        ...state,
        loading: false,
        error: null
      };
    case actionType.QUESTION_CREATE_SUCCESS:
      return {
        ...state,
        data: state.data.slice().concat(action.payload),
        loading: false,
        error: null
      };
    case actionType.QUESTION_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case actionType.QUESTION_UPDATE_REQUEST:
      return {
        ...state,
        data: state.data.map(question => {
          if (question.id !== action.payload.id) {
            return question;
          }
          return {
            ...question,
            loading: true,
            error: null
          };
        })
      };
    case actionType.QUESTION_UPDATE_SUCCESS:
      return {
        ...state,
        data: state.data.map(question => {
          if (question.id !== action.payload.id) {
            return question;
          }
          return {
            ...question,
            ...action.payload,
            loading: false,
            error: null
          };
        })
      };
    case actionType.QUESTION_UPDATE_FAILURE:
      return {
        ...state,
        data: state.data.map(question => {
          if (question.id !== action.payload.id) {
            return question;
          }
          return {
            ...question,
            loading: false,
            error: action.payload
          };
        })
      };

    case actionType.QUESTION_DELETE_REQUEST:
      return {
        ...state,
        data: state.data.map(question => {
          if (question.id !== action.payload.id) {
            return question;
          }
          return {
            ...question,
            loading: true,
            error: null
          };
        })
      };
    case actionType.QUESTION_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(question => question.id !== action.payload.id)
      };
    case actionType.QUESTION_DELETE_FAILURE:
      return {
        ...state,
        data: state.data.map(question => {
          if (question.id !== action.payload.id) {
            return question;
          }
          return {
            ...question,
            loading: false,
            error: action.payload
          };
        })
      };

    default:
      return state;
  }
};

export default questionReducer;
