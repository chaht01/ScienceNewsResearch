import { typeStringCreator } from "./creator";

export const types = {
  TAKE_LIST_FETCH_REQUEST: typeStringCreator("TAKE_LIST_FETCH_REQUEST"),
  TAKE_LIST_FETCH_SUCCESS: typeStringCreator("TAKE_LIST_FETCH_SUCCESS"),
  TAKE_LIST_FETCH_FAILURE: typeStringCreator("TAKE_LIST_FETCH_FAILURE"),
  TAKE_MARK: typeStringCreator("TAKE_MARK"), // local stage
  TAKE_ERASE: typeStringCreator("TAKE_ERASE"), //local stage
  TAKE_CREATE_REQUEST: typeStringCreator("TAKE_CREATE_REQUEST"),
  TAKE_CREATE_SUCCESS: typeStringCreator("TAKE_CREATE_SUCCESS"),
  TAKE_CREATE_FAILURE: typeStringCreator("TAKE_CREATE_FAILURE"),
  TAKE_DELETE_REQUEST: typeStringCreator("TAKE_DELETE_REQUEST"),
  TAKE_DELETE_SUCCESS: typeStringCreator("TAKE_DELETE_SUCCESS"),
  TAKE_DELETE_FAILURE: typeStringCreator("TAKE_DELETE_FAILURE"),
  TAKE_SAVE_REQUEST: typeStringCreator("TAKE_SAVE_REQUEST"), //BUNDLE SAVE
  TAKE_SAVE_SUCCESS: typeStringCreator("TAKE_SAVE_SUCCESS"),
  TAKE_SAVE_FAILRURE: typeStringCreator("TAKE_SAVE_FAILRURE"),
  TAKE_RESPONSE_UPDATE_REQUEST: typeStringCreator(
    "TAKE_RESPONSE_UPDATE_REQUEST"
  ),
  TAKE_RESPONSE_UPDATE_SUCCESS: typeStringCreator(
    "TAKE_RESPONSE_UPDATE_SUCCESS"
  ),
  TAKE_RESPONSE_UPDATE_FAILURE: typeStringCreator(
    "TAKE_RESPONSE_UPDATE_FAILURE"
  )
};

// TAKE LIST FETCHING
export const takeListFetchRequest = user_id => {
  return {
    type: types.TAKE_LIST_FETCH_REQUEST,
    payload: {
      user_id
    }
  };
};

export const takeListFetchSuccess = takes => {
  return {
    type: types.TAKE_LIST_FETCH_SUCCESS,
    payload: takes
  };
};

export const takeListFetchFailure = error => {
  return {
    type: types.TAKE_LIST_FETCH_FAILURE,
    payload: error
  };
};

// TAKE MARK & ERASE
export const takeMark = (article_id, question_id, phase = 1) => {
  return {
    type: types.TAKE_MARK,
    payload: {
      article_id,
      question_id,
      phase
    }
  };
};

export const takeErase = (article_id, question_id, phase = 1) => {
  return {
    type: types.TAKE_ERASE,
    payload: {
      article_id,
      question_id,
      phase
    }
  };
};

// TAKE CREATE
export const takeCreateRequest = (article_id, question_id, phase) => {
  return {
    type: types.TAKE_CREATE_REQUEST,
    payload: {
      phase,
      article_id,
      question_id
    }
  };
};

export const takeCreateSuccess = take => {
  return {
    type: types.TAKE_CREATE_SUCCESS,
    payload: take
  };
};

export const takeCreateFailure = error => {
  return {
    type: types.TAKE_CREATE_FAILURE,
    payload: error
  };
};

// TAKE DELETE
export const takeDeleteRequest = (id, removed_phase) => {
  return {
    type: types.TAKE_DELETE_REQUEST,
    payload: {
      id,
      removed_phase
    }
  };
};

export const takeDeleteSuccess = take => {
  return {
    type: types.TAKE_DELETE_SUCCESS,
    payload: take
  };
};

export const takeDeleteFailure = error => {
  return {
    type: types.TAKE_DELETE_FAILURE,
    payload: error
  };
};

// TAKE BUNDLE (LOCAL -> REMOTE)

export const takeTakeSaveRequest = ({ to_create, to_delete }) => {
  return {
    type: types.TAKE_SAVE_REQUEST,
    payload: {
      to_create,
      to_delete
    }
  };
};

export const takeTakeSaveSuccess = () => {
  return {
    type: types.TAKE_SAVE_SUCCESS
  };
};

export const takeTakeSaveFailure = error => {
  return {
    type: types.TAKE_SAVE_FAILURE,
    payload: error
  };
};

export const takeResponseUpdateRequest = (id, found) => {
  return {
    type: types.TAKE_RESPONSE_UPDATE_REQUEST,
    payload: {
      id,
      found
    }
  };
};

export const takeResponseUpdateSuccess = milestone => {
  return {
    type: types.TAKE_RESPONSE_UPDATE_SUCCESS,
    payload: milestone
  };
};

export const takeResponseUpdateFailure = error => {
  return {
    type: types.TAKE_RESPONSE_UPDATE_FAILURE,
    payload: error
  };
};
