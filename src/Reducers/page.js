import { types as actionType } from "../Actions/page";

export const PAGES = {
  OVERALL: "OVERALL",
  QUESTIONER_INTRO: "QUESTIONER_INTRO",
  QUESTIONER_STEP1: "QUESTIONER_STEP1",
  QUESTIONER_STEP2: "QUESTIONER_STEP2",
  QUESTIONER_STEP3: "QUESTIONER_STEP3",
  QUESTIONER_STEP4: "QUESTIONER_STEP4",
  ANSWERER_INTRO: "ANSWERER_INTRO",
  ANSWERER_STEP1: "ANSWERER_STEP1",
  ANSWERER_STEP2: "ANSWERER_STEP2"
};

const initialState = {
  loading: false,
  data: PAGES.OVERALL
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PAGE_NEXT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actionType.PAGE_NEXT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: PAGES.hasOwnProperty(action.payload.page)
          ? action.payload.page
          : state.data
      };
    case actionType.PAGE_NEXT_FAILURE:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default pageReducer;
