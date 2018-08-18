import { typeStringCreator } from "./creator";

export const types = {
  HIGHLIGHT_FETCH_REQUEST: typeStringCreator("HIGHLIGHT_FETCH_REQUEST"),
  HIGHLIGHT_FETCH_SUCCESS: typeStringCreator("HIGHLIGHT_FETCH_SUCCESS"),
  HIGHLIGHT_FETCH_FAILURE: typeStringCreator("HIGHLIGHT_FETCH_FAILURE"),

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

// HIGHLIGHT MODE UI
export const highlightHighlightModeActivate = ({
  article,
  question,
  id,
  _latest_milestone
}) => {
  return {
    type: types.HIGHLIGHT_MODE_ACTIVATE,
    payload: {
      article_id: article,
      question_id: question,
      take_id: id,
      responses: _latest_milestone.responses
    }
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
