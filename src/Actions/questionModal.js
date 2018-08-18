import { typeStringCreator } from "./creator";

export const types = {
  QUESTION_MODAL_OPEN: typeStringCreator("QUESTION_MODAL_OPEN"),
  QUESTION_MODAL_CLOSE: typeStringCreator("QUESTION_MODAL_CLOSE"),

  QUESTION_MODAL_NEXT: typeStringCreator("QUESTION_MODAL_NEXT"),

  QUESTION_MODAL_TYPE_QUESTION: typeStringCreator(
    "QUESTION_MODAL_TYPE_QUESTION"
  ),
  QUESTION_MODAL_TYPE_INTENTION: typeStringCreator(
    "QUESTION_MODAL_TYPE_INTENTION"
  ),
  QUESTION_MODAL_CHANGE_CODE: typeStringCreator("QUESTION_MODAL_CHANGE_CODE"),

  QUESTION_MODAL_FETCH_INQUIRIES_REQUEST: typeStringCreator(
    "QUESTION_MODAL_FETCH_INQUIRIES_REQUEST"
  ),
  QUESTION_MODAL_FETCH_INQUIRIES_SUCCESS: typeStringCreator(
    "QUESTION_MODAL_FETCH_INQUIRIES_SUCCESS"
  ),
  QUESTION_MODAL_FETCH_INQUIRIES_FAILURE: typeStringCreator(
    "QUESTION_MODAL_FETCH_INQUIRIES_FAILURE"
  ),
  QUESTION_MODAL_UPDATE_INQUIRIES: typeStringCreator(
    "QUESTION_MODAL_UPDATE_INQUIRIES"
  )
};

// QUESTION MODAL OPEN & CLOSE
export const questionModalOpen = () => {
  return {
    type: types.QUESTION_MODAL_OPEN
  };
};

export const questionModalClose = () => {
  return {
    type: types.QUESTION_MODAL_CLOSE
  };
};

export const questionModalNext = step => {
  return {
    type: types.QUESTION_MODAL_NEXT,
    payload: step !== undefined ? step : 0
  };
};

export const questionModalTypeQuestion = typed => {
  return {
    type: types.QUESTION_MODAL_TYPE_QUESTION,
    payload: {
      typed
    }
  };
};

export const questionModalTypeIntention = typed => {
  return {
    type: types.QUESTION_MODAL_TYPE_INTENTION,
    payload: {
      typed
    }
  };
};

export const questionModalChangeCode = code => {
  return {
    type: types.QUESTION_MODAL_CHANGE_CODE,
    payload: code
  };
};

export const questionModalFetchInquiriesRequest = () => {};
export const questionModalFetchInquiriesSuccess = () => {};
export const questionModalFetchInquiriesFailure = error => {};

export const questionModalUpdateInquiries = () => {};
