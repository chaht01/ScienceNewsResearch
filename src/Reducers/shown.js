import { types as actionType } from "../Actions/shown";

const initialState = {
  loading: false,
  error: null,
  data: [],
  call_cnt: 0
};

const shownReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SHOWN_FETCH_REQUEST:
      return {
        ...state,
        loading: true
      };

    case actionType.SHOWN_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: [
          ...state.data,
          ...action.payload.map(shown => ({
            ...shown,
            _loading: false,
            _error: null,
            _expanded: false
          }))
        ],
        call_cnt: state.call_cnt + 1
      };
    case actionType.SHOWN_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actionType.SHOWN_ANSWER_HIGHLIGHT_REQEUST:
    case actionType.SHOWN_ANSWER_DELETE_REQUEST:
      return {
        ...state,
        data: state.data.map(shown => {
          if (shown.id !== action.payload.shown_id) {
            return shown;
          } else {
            console.log(shown);
            return {
              ...shown,
              _loading: true
            };
          }
        })
      };
    case actionType.SHOWN_ANSWER_HIGHLIGHT_SUCCESS:
    case actionType.SHOWN_ANSWER_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.map(shown => {
          if (shown.id !== action.payload.shown) {
            return shown;
          } else {
            return {
              ...shown,
              takes: [...shown.takes, action.payload],
              _loading: false
            };
          }
        })
      };
    case actionType.SHOWN_ANSWER_HIGHLIGHT_FAILURE:
    case actionType.SHOWN_ANSWER_DELETE_FAILURE:
      return {
        ...state,
        data: state.data.map(shown => {
          if (!shown.loading) {
            return shown;
          } else {
            return {
              ...shown,
              _loading: false,
              _error: action.payload
            };
          }
        })
      };
    case actionType.SHOWN_EXPAND_TOGGLE:
      return {
        ...state,
        data: state.data.map(shown => {
          if (shown.id !== action.payload.shown_id) {
            return shown;
          } else {
            return {
              ...shown,
              _expanded: !shown._expanded
            };
          }
        })
      };
    default:
      return state;
  }
};

export default shownReducer;
