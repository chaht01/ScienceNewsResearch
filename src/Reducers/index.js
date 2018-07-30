import { combineReducers } from "redux";
import articleReducer from "./article";
import questionReducer from "./question";
import highlightReducer from "./highlight";
import authReducer from "./auth";
import takeReducer from "./take";
import pageReducer from "./page";

const appReducer = combineReducers({
  articleReducer,
  questionReducer,
  highlightReducer,
  authReducer,
  takeReducer,
  pageReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
