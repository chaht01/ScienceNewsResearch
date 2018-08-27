import { all } from "redux-saga/effects";
import { signinFlow, signupFlow } from "./auth";
import { watchNextPageAsync } from "./page";
import { watchFetchArticleAsync } from "./article";
import {
  watchCreateQuestionsAsync,
  watchFetchQuestionsAsync,
  watchHandleQuestionAsync,
  watchQuestionModalInquiriesFetchAsync,
  watchQuestionModalCRUDAsync,
  watchQuestionHighlightSaveAsync
} from "./question";
import {
  watchFetchHighlightsAsync,
  watchHandleBundleHighlightAsync
} from "./highlight";
import {
  watchFetchTakesAsync,
  watchHandleBundleTakeAsync,
  watchCreateTakeAsync,
  watchDeleteTakeAsync,
  watchTakeResponseUpdateAsync,
  watchFetchTakeSuggestionAsync
} from "./take";
import {
  watchFetchShownsAsync,
  watchAnswerHighlightOnShownAsync
} from "./shown";
import { watchCodeFetchAsync } from "./code";
export default function* rootSaga() {
  yield all([
    signinFlow(),
    signupFlow(),
    watchNextPageAsync(),
    watchFetchArticleAsync(),
    watchCreateQuestionsAsync(),
    watchFetchQuestionsAsync(),
    watchHandleQuestionAsync(),
    watchQuestionModalInquiriesFetchAsync(),
    watchFetchHighlightsAsync(),
    watchHandleBundleHighlightAsync(),
    watchFetchTakesAsync(),
    watchCreateTakeAsync(),
    watchDeleteTakeAsync(),
    watchHandleBundleTakeAsync(),
    watchTakeResponseUpdateAsync(),
    watchFetchTakeSuggestionAsync(),
    watchFetchShownsAsync(),
    watchAnswerHighlightOnShownAsync(),
    watchCodeFetchAsync(),
    watchQuestionModalCRUDAsync(),
    watchQuestionHighlightSaveAsync()
  ]);
}
