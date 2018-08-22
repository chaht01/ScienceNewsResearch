import { typeStringCreator } from "./creator";

export const types = {
  QUESTION_HIGHLIGHT_FETCH_REQUEST: typeStringCreator(
    "QUESTION_HIGHLIGHT_FETCH_REQUEST"
  ),
  QUESTION_HIGHLIGHT_FETCH_SUCCESS: typeStringCreator(
    "QUESTION_HIGHLIGHT_FETCH_SUCCESS"
  ),
  QUESTION_HIGHLIGHT_FETCH_FAILURE: typeStringCreator(
    "QUESTION_HIGHLIGHT_FETCH_FAILURE"
  ),

  QUESTION_HIGHLIGHT_MODE_ACTIVATE: typeStringCreator(
    "QUESTION_HIGHLIGHT_MODE_ACTIVATE"
  ),
  QUESTION_HIGHLIGHT_MODE_UNDO: typeStringCreator(
    "QUESTION_HIGHLIGHT_MODE_UNDO"
  ),
  QUESTION_HIGHLIGHT_MARK: typeStringCreator("QUESTION_HIGHLIGHT_MARK"),
  QUESTION_HIGHLIGHT_ERASE: typeStringCreator("QUESTION_HIGHLIGHT_ERASE"),
  QUESTION_HIGHLIGHT_SAVE_REQUEST: typeStringCreator(
    "QUESTION_HIGHLIGHT_SAVE_REQUEST"
  ),
  QUESTION_HIGHLIGHT_SAVE_SUCCESS: typeStringCreator(
    "QUESTION_HIGHLIGHT_SAVE_SUCCESS"
  ),
  QUESTION_HIGHLIGHT_SAVE_FAILURE: typeStringCreator(
    "QUESTION_HIGHLIGHT_SAVE_FAILURE"
  ),

  QUESTION_HIGHLIGHT_HOVER_ENTER: typeStringCreator(
    "QUESTION_HIGHLIGHT_HOVER_ENTER"
  ),
  QUESTION_HIGHLIGHT_HOVER_LEAVE: typeStringCreator(
    "QUESTION_HIGHLIGHT_HOVER_LEAVE"
  ),
  QUESTION_HIGHLIGHT_ACTIVE_TAB: typeStringCreator(
    "QUESTION_HIGHLIGHT_ACTIVE_TAB"
  )
};

// HIGHLIGHT FETCHING
export const questionHighlightFetchRequest = article_id => {
  return {
    type: types.QUESTION_HIGHLIGHT_FETCH_REQUEST,
    payload: {
      article_id
    }
  };
};

export const questionHighlightFetchSuccess = highlights => {
  return {
    type: types.QUESTION_HIGHLIGHT_FETCH_SUCCESS,
    payload: highlights
  };
};

export const questionHighlightFetchFailure = error => {
  return {
    type: types.QUESTION_HIGHLIGHT_FETCH_FAILURE,
    payload: error
  };
};

// HIGHLIGHT MODE UI
export const questionHighlightModeActivate = ({
  article_id,
  question = null
}) => {
  return {
    type: types.QUESTION_HIGHLIGHT_MODE_ACTIVATE,
    payload: {
      article_id,
      question
    }
  };
};

export const questionHighlightModeUndo = () => {
  return {
    type: types.QUESTION_HIGHLIGHT_MODE_UNDO
  };
};

export const questionHighlightMark = sentence_id => {
  return {
    type: types.QUESTION_HIGHLIGHT_MARK,
    payload: {
      sentence_id
    }
  };
};

export const questionHighlightErase = sentence_id => {
  return {
    type: types.QUESTION_HIGHLIGHT_ERASE,
    payload: {
      sentence_id
    }
  };
};

export const questionHighlightSaveRequest = (question_id, sentences) => {
  return {
    type: types.QUESTION_HIGHLIGHT_SAVE_REQUEST,
    payload: {
      id: question_id,
      sentences
    }
  };
};

export const questionHighlightSaveSuccess = question_with_highlight => {
  return {
    type: types.QUESTION_HIGHLIGHT_SAVE_SUCCESS,
    payload: question_with_highlight
  };
};

export const questionHighlightSaveFailure = error => {
  return {
    type: types.QUESTION_HIGHLIGHT_SAVE_FAILURE,
    payload: error
  };
};

export const questionHighlightHoverEnter = sentence_id => {
  return {
    type: types.QUESTION_HIGHLIGHT_HOVER_ENTER,
    payload: {
      sentence_id
    }
  };
};

export const questionHighlightHoverLeave = sentence_id => {
  return {
    type: types.QUESTION_HIGHLIGHT_HOVER_LEAVE,
    payload: {
      sentence_id
    }
  };
};

export const questionHighlightActiveTab = activeTabIdx => {
  return {
    type: types.QUESTION_HIGHLIGHT_ACTIVE_TAB,
    payload: {
      activeTabIdx
    }
  };
};
