import { types as actionType } from "../Actions/question";

const initialState = {
  loading: false,
  error: null,
  data: [],
  typed: "",
  folding: true
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.QUESTION_TYPE: {
      return {
        ...state,
        typed: action.payload.typed
      };
    }
    case actionType.POOL_FOLDING_OPEN:
      return {
        ...state,
        folding: false
      };
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
          _loading: false, // For async purpose
          _error: false, // For async purpose
          _expanded: false
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

    case actionType.QUESTION_MODAL_OPEN:
      return {
        ...state,
        crudModalOpened: true
      };

    case actionType.QUESTION_MODAL_CLOSE:
      return {
        ...state,
        crudModalOpened: false
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
        data: state.data.slice().concat(
          action.payload.map(q => ({
            ...q,
            _loading: false,
            _error: null,
            _expanded: false
          }))
        ),
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
            _loading: true,
            _error: null
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
            _loading: false,
            _error: null
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
            _loading: true,
            _error: null
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
            _loading: false,
            _error: action.payload
          };
        })
      };
    case actionType.QUESTION_EXPAND_TOGGLE:
      return {
        ...state,
        data: state.data.map(q => {
          if (q.id !== action.payload.question_id) {
            return q;
          } else {
            return {
              ...q,
              _expanded: !q._expanded
            };
          }
        })
      };

    default:
      return state;
  }
};

export default questionReducer;
