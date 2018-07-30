import { typeStringCreator } from "./creator";

export const types = {
  HIGHLIGHT_FETCH_REQUEST: typeStringCreator("HIGHLIGHT_FETCH_REQUEST"),
  HIGHLIGHT_FETCH_SUCCESS: typeStringCreator("HIGHLIGHT_FETCH_SUCCESS"),
  HIGHLIGHT_FETCH_FAILURE: typeStringCreator("HIGHLIGHT_FETCH_FAILURE"),

  HIGHLIGHT_CREATE_REQUEST: typeStringCreator("HIGHLIGHT_CREATE_REQUEST"),
  HIGHLIGHT_CREATE_SUCCESS: typeStringCreator("HIGHLIGHT_CREATE_SUCCESS"),
  HIGHLIGHT_CREATE_FAILURE: typeStringCreator("HIGHLIGHT_CREATE_FAILURE"),

  HIGHLIGHT_DELETE_REQUEST: typeStringCreator("HIGHLIGHT_DELETE_REQUEST"),
  HIGHLIGHT_DELETE_SUCCESS: typeStringCreator("HIGHLIGHT_DELETE_SUCCESS"),
  HIGHLIGHT_DELETE_FAILURE: typeStringCreator("HIGHLIGHT_DELETE_FAILURE"),

  HIGHLIGHT_MODE_ACTIVATE: typeStringCreator("HIGHLIGHT_MODE_ACTIVATE"),
  HIGHLIGHT_MODE_UNDO: typeStringCreator("HIGHLIGHT_MODE_UNDO"),
  HIGHLIGHT_MARK: typeStringCreator("HIGHLIGHT_MARK"),
  HIGHLIGHT_ERASE: typeStringCreator("HIGHLIGHT_ERASE"),
  HIGHLIGHT_SAVE_REQUEST: typeStringCreator("HIGHLIGHT_SAVE_REQUEST"),
  HIGHLIGHT_SAVE_SUCCESS: typeStringCreator("HIGHLIGHT_SAVE_SUCCESS"),
  HIGHLIGHT_SAVE_FAILURE: typeStringCreator("HIGHLIGHT_SAVE_FAILURE"),

  HIGHLIGHT_HOVER_ENTER: typeStringCreator("HIGHLIGHT_HOVER_ENTER"),
  HIGHLIGHT_HOVER_LEAVE: typeStringCreator("HIGHLIGHT_HOVER_LEAVE")
};

// HIGHLIGHT FETCHING
export const highlightHighlightFetchRequest = article_id => {
  return {
    type: types.HIGHLIGHT_FETCH_REQUEST,
    payload: {
      article_id
    }
  };
};

export const highlightHighlightFetchSuccess = highlights => {
  return {
    type: types.HIGHLIGHT_FETCH_SUCCESS,
    payload: highlights
  };
};

export const highlightHighlightFetchFailure = error => {
  return {
    type: types.HIGHLIGHT_FETCH_FAILURE,
    payload: error
  };
};

// HIGHLIGHT ADD
export const highlightHighlightCreateRequest = (
  article_id,
  question_id,
  sentence_id
) => {
  return {
    type: types.HIGHLIGHT_CREATE_REQUEST,
    payload: {
      article_id,
      question_id,
      sentence_id
    }
  };
};

export const highlightHighlightCreateSuccess = highlight => {
  return {
    type: types.HIGHLIGHT_CREATE_SUCCESS,
    payload: highlight
  };
};

export const highlightHighlightCreateFailure = error => {
  return {
    type: types.HIGHLIGHT_CREATE_FAILURE,
    payload: error
  };
};

// HIGHLIGHT DELETE
export const highlightHighlightDeleteRequest = (
  article_id,
  question_id,
  sentence_id
) => {
  return {
    type: types.HIGHLIGHT_DELETE_REQUEST,
    payload: {
      article_id,
      question_id,
      sentence_id
    }
  };
};

export const highlightHighlightDeleteSuccess = highlight => {
  return {
    type: types.HIGHLIGHT_DELETE_SUCCESS,
    payload: highlight
  };
};

export const highlightHighlightDeleteFailure = error => {
  return {
    type: types.HIGHLIGHT_DELETE_FAILURE,
    payload: error
  };
};

// HIGHLIGHT MODE UI
export const highlightHighlightModeActivate = targetTake => {
  return {
    type: types.HIGHLIGHT_MODE_ACTIVATE,
    payload: targetTake
  };
};

export const highlightHighlightModeUndo = () => {
  return {
    type: types.HIGHLIGHT_MODE_UNDO
  };
};

export const highlightHighlightMark = sentence_id => {
  return {
    type: types.HIGHLIGHT_MARK,
    payload: {
      sentence_id
    }
  };
};

export const highlightHighlightErase = sentence_id => {
  return {
    type: types.HIGHLIGHT_ERASE,
    payload: {
      sentence_id
    }
  };
};

export const highlightHighlightSaveRequest = (take_id, found, sentences) => {
  return {
    type: types.HIGHLIGHT_SAVE_REQUEST,
    payload: {
      id: take_id,
      found,
      sentences
    }
  };
};

export const highlightHighlightSaveSuccess = milestone => {
  return {
    type: types.HIGHLIGHT_SAVE_SUCCESS,
    payload: milestone
  };
};

export const highlightHighlightSaveFailure = error => {
  return {
    type: types.HIGHLIGHT_SAVE_FAILURE,
    payload: error
  };
};

export const highlightHighlightHoverEnter = question_ids => {
  return {
    type: types.HIGHLIGHT_HOVER_ENTER,
    payload: {
      question_ids
    }
  };
};

export const highlightHighlightHoverLeave = question_ids => {
  return {
    type: types.HIGHLIGHT_HOVER_LEAVE,
    payload: {
      question_ids
    }
  };
};
