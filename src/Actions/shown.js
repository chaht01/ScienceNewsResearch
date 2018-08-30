import { typeStringCreator } from "./creator";

export const types = {
  SHOWN_FETCH_REQUEST: typeStringCreator("SHOWN_FETCH_REQUEST"),
  SHOWN_FETCH_SUCCESS: typeStringCreator("SHOWN_FETCH_SUCCESS"),
  SHOWN_FETCH_FAILURE: typeStringCreator("SHOWN_FETCH_FAILURE"),

  SHOWN_ANSWER_HIGHLIGHT_REQEUST: typeStringCreator(
    "SHOWN_ANSWER_HIGHLIGHT_REQUEST"
  ),
  SHOWN_ANSWER_HIGHLIGHT_SUCCESS: typeStringCreator(
    "SHOWN_ANSWER_HIGHLIGHT_SUCCESS"
  ),
  SHOWN_ANSWER_HIGHLIGHT_FAILURE: typeStringCreator(
    "SHOWN_ANSWER_HIGHLIGHT_FAILURE"
  ),

  SHOWN_ANSWER_DELETE_REQUEST: typeStringCreator("SHOWN_ANSWER_DELETE_REQUEST"),
  SHOWN_ANSWER_DELETE_SUCCESS: typeStringCreator("SHOWN_ANSWER_DELETE_SUCCESS"),
  SHOWN_ANSWER_DELETE_FAILURE: typeStringCreator("SHOWN_ANSWER_DELETE_FAILURE"),

  SHOWN_EXPAND_TOGGLE: typeStringCreator("SHOWN_EXPAND_TOGGLE")
};

export const shownFetchRequest = call_cnt => {
  return {
    type: types.SHOWN_FETCH_REQUEST,
    payload: {
      call_cnt
    }
  };
};

export const shownFetchSuccess = shownList => {
  return {
    type: types.SHOWN_FETCH_SUCCESS,
    payload: shownList
  };
};

export const shownFetchFailure = error => {
  return {
    type: types.SHOWN_FETCH_FAILURE,
    payload: error
  };
};

export const shownAnswerHighlightRequest = (shown_id, sentence_ids) => {
  return {
    type: types.SHOWN_ANSWER_HIGHLIGHT_REQEUST,
    payload: {
      shown_id,
      sentence_ids
    }
  };
};

export const shownAnswerHighlightSuccess = shownTake => {
  return {
    type: types.SHOWN_ANSWER_HIGHLIGHT_SUCCESS,
    payload: shownTake
  };
};

export const shownAnswerHighlightFailure = error => {
  return {
    type: types.SHOWN_ANSWER_HIGHLIGHT_FAILURE,
    payload: error
  };
};

export const shownAnswerDeleteRequest = shown_id => {
  return {
    type: types.SHOWN_ANSWER_DELETE_REQUEST,
    payload: {
      shown_id
    }
  };
};

export const shownAnswerDeleteSuccess = shownTake => {
  return {
    type: types.SHOWN_ANSWER_DELETE_SUCCESS,
    payload: shownTake
  };
};

export const shownAnswerDeleteFailure = error => {
  return {
    type: types.SHOWN_ANSWER_DELETE_FAILURE,
    payload: error
  };
};

export const shownExpandToggle = shown_id => {
  return {
    type: types.SHOWN_EXPAND_TOGGLE,
    payload: {
      shown_id
    }
  };
};
