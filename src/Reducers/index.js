import { combineReducers } from "redux";
import articleReducer from "./article";
import questionReducer from "./question";
import highlightReducer from "./highlight";
import authReducer from "./auth";
import takeReducer from "./take";
import pageReducer from "./page";
import poolExampleReducer from "./poolExample";
import questionModalReducer from "./questionModal";
import questionHighlightReducer from "./questionHighlight";
import answerHighlightReducer from "./answerHighlight";
import shownReducer from "./shown";
import codeReducer from "./code";
const appReducer = combineReducers({
  articleReducer,
  questionReducer,
  highlightReducer,
  questionHighlightReducer,
  authReducer,
  takeReducer,
  pageReducer,
  poolExampleReducer,
  questionModalReducer,
  answerHighlightReducer,
  shownReducer,
  codeReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
