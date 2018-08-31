import { typeCreator, typeStringCreator } from "./creator";

export const types = {
  QUESTION_TYPE: typeStringCreator("QUESTION_TYPE"),
  POOL_FOLDING_OPEN: typeStringCreator("POOL_FOLDING_OPEN"),

  POOL_FETCH_REQUEST: typeStringCreator("POOL_FETCH_REQUEST"),
  POOL_FETCH_SUCCESS: typeStringCreator("POOL_FETCH_SUCCESS"),
  POOL_FETCH_FAILURE: typeStringCreator("POOL_FETCH_FAILURE"),

  QUESTION_CREATE_REQUEST: typeStringCreator("QUESTION_CREATE_REQUEST"),
  QUESTION_CREATE_SUCCESS: typeStringCreator("QUESTION_CREATE_SUCCESS"),
  QUESTION_CREATE_FAILURE: typeStringCreator("QUESTION_CREATE_FAILURE"),

  QUESTION_UPDATE_REQUEST: typeStringCreator("QUESTION_UPDATE_REQUEST"),
  QUESTION_UPDATE_SUCCESS: typeStringCreator("QUESTION_UPDATE_SUCCESS"),
  QUESTION_UPDATE_FAILURE: typeStringCreator("QUESTION_UPDATE_FAILURE"),

  QUESTION_DELETE_REQUEST: typeStringCreator("QUESTION_DELETE_REQUEST"),
  QUESTION_DELETE_SUCCESS: typeStringCreator("QUESTION_DELETE_SUCCESS"),
  QUESTION_DELETE_FAILURE: typeStringCreator("QUESTION_DELETE_FAILURE"),

  QUESTION_EXPAND_TOGGLE: typeStringCreator("QUESTION_EXPAND_TOGGLE")
};

export const quesitonType = typed => {
  return {
    type: types.QUESTION_TYPE,
    payload: {
      typed
    }
  };
};

export const poolFoldingOpen = () => {
  return {
    type: types.POOL_FOLDING_OPEN
  };
};

// POOL FETCHING
export const questionPoolFetchRequest = (article_id, created_phase) => {
  return {
    type: types.POOL_FETCH_REQUEST,
    payload: {
      article_id,
      created_phase
    }
  };
};

export const questionPoolFetchSuccess = questions => {
  return {
    type: types.POOL_FETCH_SUCCESS,
    payload: questions
  };
};

export const questionPoolFetchFailure = err => {
  return {
    type: types.POOL_FETCH_FAILURE,
    payload: err
  };
};

// QUESTION CREATING
export const questionQuestionCreateRequest = (
  text,
  phase,
  research_id,
  article_id
) => {
  return {
    type: types.QUESTION_CREATE_REQUEST,
    payload: {
      text,
      phase,
      research_id,
      article_id
    }
  };
};

export const questionQuestionCreateSuccess = question => {
  return {
    type: types.QUESTION_CREATE_SUCCESS,
    payload: question
  };
};

export const questionQuestionCreateFailure = error => {
  return {
    type: types.QUESTION_CREATE_FAILURE,
    payload: error
  };
};

// QUESTION UPDATING
export const questionQuestionUpdateRequest = question => {
  return {
    type: types.QUESTION_UPDATE_REQUEST,
    payload: question
  };
};

export const questionQuestionUpdateSuccess = (legacy_question_id, question) => {
  return {
    type: types.QUESTION_UPDATE_SUCCESS,
    payload: {
      legacy_question_id,
      question
    }
  };
};

export const questionQuestionUpdateFailure = error => {
  return {
    type: types.QUESTION_UPDATE_FAILURE,
    payload: error
  };
};

// QUESTION DELETION
export const questionQuestionDeleteRequest = question => {
  return {
    type: types.QUESTION_DELETE_REQUEST,
    payload: question
  };
};

export const questionQuestionDeleteSuccess = question => {
  return {
    type: types.QUESTION_DELETE_SUCCESS,
    payload: question
  };
};

export const questionQuestionDeleteFailure = error => {
  return {
    type: types.QUESTION_DELETE_FAILURE,
    payload: error
  };
};

export const questionQuestionExpandToggle = question_id => {
  return {
    type: types.QUESTION_EXPAND_TOGGLE,
    payload: {
      question_id
    }
  };
};
