import { typeStringCreator, typeCreator } from "./creator";

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
  QUESTION_MODAL_CHANGE_CODE_FIRST: typeStringCreator(
    "QUESTION_MODAL_CHANGE_CODE_FIRST"
  ),
  QUESTION_MODAL_CHANGE_CODE_SECOND: typeStringCreator(
    "QUESTION_MODAL_CHANGE_CODE_SECOND"
  ),

  QUESTION_MODAL_FETCH_INQUIRIES_REQUEST: typeStringCreator(
    "QUESTION_MODAL_FETCH_INQUIRIES_REQUEST"
  ),
  QUESTION_MODAL_FETCH_INQUIRIES_SUCCESS: typeStringCreator(
    "QUESTION_MODAL_FETCH_INQUIRIES_SUCCESS"
  ),
  QUESTION_MODAL_FETCH_INQUIRIES_FAILURE: typeStringCreator(
    "QUESTION_MODAL_FETCH_INQUIRIES_FAILURE"
  ),
  QUESTION_MODAL_CLEAR_INQUIRIES: typeStringCreator(
    "QUESTION_MODAL_CLEAR_INQUIRIES"
  ),
  QUESTION_MODAL_UPDATE_INQUIRY: typeStringCreator(
    "QUESTION_MODAL_UPDATE_INQUIRY"
  ),
  QUESTION_MODAL_CRUD_SUBMIT_REQUEST: typeStringCreator(
    "QUESTION_MODAL_CRUD_SUBMIT_REQUEST"
  ),
  QUESTION_MODAL_CRUD_SUBMIT_SUCCESS: typeStringCreator(
    "QUESTION_MODAL_CRUD_SUBMIT_SUCCESS"
  ),
  QUESTION_MODAL_CRUD_SUBMIT_FAILURE: typeStringCreator(
    "QUESTION_MODAL_CRUD_SUBMIT_FAILURE"
  )
};

// QUESTION MODAL OPEN & CLOSE
export const questionModalOpen = instance => {
  return {
    type: types.QUESTION_MODAL_OPEN,
    payload: instance
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

export const questionModalChangeCodeFirst = code_id => {
  return {
    type: types.QUESTION_MODAL_CHANGE_CODE_FIRST,
    payload: code_id
  };
};

export const questionModalChangeCodeSecond = code_id => {
  return {
    type: types.QUESTION_MODAL_CHANGE_CODE_SECOND,
    payload: code_id
  };
};

export const questionModalFetchInquiriesRequest = typed => {
  return {
    type: types.QUESTION_MODAL_FETCH_INQUIRIES_REQUEST,
    payload: { typed }
  };
};
export const questionModalFetchInquiriesSuccess = inquiries => {
  return {
    type: types.QUESTION_MODAL_FETCH_INQUIRIES_SUCCESS,
    payload: inquiries
  };
};
export const questionModalFetchInquiriesFailure = error => {
  return {
    type: types.QUESTION_MODAL_FETCH_INQUIRIES_FAILURE,
    payload: error
  };
};

export const questionModalClearInquries = () => {
  return {
    type: types.QUESTION_MODAL_CLEAR_INQUIRIES
  };
};

export const questionModalUpdateInquiry = (inquiry_id, similarity) => {
  return {
    type: types.QUESTION_MODAL_UPDATE_INQUIRY,
    payload: {
      inquiry_id,
      similarity
    }
  };
};

export const questionCRUDSubmitRequest = (
  phase,
  question_id,
  typed,
  intention,
  code_first_id,
  code_second_id,
  group_inquries,
  onSubmit
) => {
  return {
    type: types.QUESTION_MODAL_CRUD_SUBMIT_REQUEST,
    payload: {
      phase,
      question_id,
      typed,
      intention,
      code_first_id,
      code_second_id,
      group_inquries,
      onSubmit
    }
  };
};

export const questionCRUDSubmitSuccess = () => {
  return {
    type: types.QUESTION_MODAL_CRUD_SUBMIT_SUCCESS
  };
};

export const questionCRUDSubmitFailure = error => {
  return {
    type: types.QUESTION_MODAL_CRUD_SUBMIT_FAILURE,
    payload: error
  };
};
