import { typeStringCreator } from "./creator";

export const types = {
  ANSWER_HIGHLIGHT_FETCH_REQUEST: typeStringCreator(
    "ANSWER_HIGHLIGHT_FETCH_REQUEST"
  ),
  ANSWER_HIGHLIGHT_FETCH_SUCCESS: typeStringCreator(
    "ANSWER_HIGHLIGHT_FETCH_SUCCESS"
  ),
  ANSWER_HIGHLIGHT_FETCH_FAILURE: typeStringCreator(
    "ANSWER_HIGHLIGHT_FETCH_FAILURE"
  ),

  ANSWER_HIGHLIGHT_MODE_ACTIVATE: typeStringCreator(
    "ANSWER_HIGHLIGHT_MODE_ACTIVATE"
  ),
  ANSWER_HIGHLIGHT_MODE_UNDO: typeStringCreator("ANSWER_HIGHLIGHT_MODE_UNDO"),
  ANSWER_HIGHLIGHT_MARK: typeStringCreator("ANSWER_HIGHLIGHT_MARK"),
  ANSWER_HIGHLIGHT_ERASE: typeStringCreator("ANSWER_HIGHLIGHT_ERASE"),
  ANSWER_HIGHLIGHT_SAVE_REQUEST: typeStringCreator(
    "ANSWER_HIGHLIGHT_SAVE_REQUEST"
  ),
  ANSWER_HIGHLIGHT_SAVE_SUCCESS: typeStringCreator(
    "ANSWER_HIGHLIGHT_SAVE_SUCCESS"
  ),
  ANSWER_HIGHLIGHT_SAVE_FAILURE: typeStringCreator(
    "ANSWER_HIGHLIGHT_SAVE_FAILURE"
  ),

  ANSWER_HIGHLIGHT_HOVER_ENTER: typeStringCreator(
    "ANSWER_HIGHLIGHT_HOVER_ENTER"
  ),
  ANSWER_HIGHLIGHT_HOVER_LEAVE: typeStringCreator(
    "ANSWER_HIGHLIGHT_HOVER_LEAVE"
  ),
  ANSWER_HIGHLIGHT_ACTIVE_TAB: typeStringCreator("ANSWER_HIGHLIGHT_ACTIVE_TAB")
};

// HIGHLIGHT FETCHING
export const answerHighlightFetchRequest = article_id => {
  return {
    type: types.ANSWER_HIGHLIGHT_FETCH_REQUEST,
    payload: {
      article_id
    }
  };
};

export const answerHighlightFetchSuccess = highlights => {
  return {
    type: types.ANSWER_HIGHLIGHT_FETCH_SUCCESS,
    payload: highlights
  };
};

export const answerHighlightFetchFailure = error => {
  return {
    type: types.ANSWER_HIGHLIGHT_FETCH_FAILURE,
    payload: error
  };
};

// HIGHLIGHT MODE UI
export const answerHighlightModeActivate = ({ article_id, shown }) => {
  return {
    type: types.ANSWER_HIGHLIGHT_MODE_ACTIVATE,
    payload: {
      article_id,
      shown
    }
  };
};

export const answerHighlightModeUndo = () => {
  return {
    type: types.ANSWER_HIGHLIGHT_MODE_UNDO
  };
};

export const answerHighlightMark = sentence_id => {
  return {
    type: types.ANSWER_HIGHLIGHT_MARK,
    payload: {
      sentence_id
    }
  };
};

export const answerHighlightErase = sentence_id => {
  return {
    type: types.ANSWER_HIGHLIGHT_ERASE,
    payload: {
      sentence_id
    }
  };
};

export const answerHighlightSaveRequest = (question_id, sentences) => {
  return {
    type: types.ANSWER_HIGHLIGHT_SAVE_REQUEST,
    payload: {
      id: question_id,
      sentences
    }
  };
};

export const answerHighlightSaveSuccess = question_with_highlight => {
  return {
    type: types.ANSWER_HIGHLIGHT_SAVE_SUCCESS,
    payload: question_with_highlight
  };
};

export const answerHighlightSaveFailure = error => {
  return {
    type: types.ANSWER_HIGHLIGHT_SAVE_FAILURE,
    payload: error
  };
};

export const answerHighlightHoverEnter = sentence_id => {
  return {
    type: types.ANSWER_HIGHLIGHT_HOVER_ENTER,
    payload: {
      sentence_id
    }
  };
};

export const answerHighlightHoverLeave = sentence_id => {
  return {
    type: types.ANSWER_HIGHLIGHT_HOVER_LEAVE,
    payload: {
      sentence_id
    }
  };
};

export const answerHighlightActiveTab = activeTabIdx => {
  return {
    type: types.ANSWER_HIGHLIGHT_ACTIVE_TAB,
    payload: {
      activeTabIdx
    }
  };
};
