import { all } from "redux-saga/effects";
import { signinFlow, signupFlow } from "./auth";
import { watchNextPageAsync } from "./page";
import { watchFetchArticleAsync } from "./article";
import {
  watchCreateQuestionsAsync,
  watchFetchQuestionsAsync,
  watchHandleQuestionAsync
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

export default function* rootSaga() {
  yield all([
    signinFlow(),
    signupFlow(),
    watchNextPageAsync(),
    watchFetchArticleAsync(),
    watchCreateQuestionsAsync(),
    watchFetchQuestionsAsync(),
    watchHandleQuestionAsync(),
    watchFetchHighlightsAsync(),
    watchHandleBundleHighlightAsync(),
    watchFetchTakesAsync(),
    watchCreateTakeAsync(),
    watchDeleteTakeAsync(),
    watchHandleBundleTakeAsync(),
    watchTakeResponseUpdateAsync(),
    watchFetchTakeSuggestionAsync()
  ]);
}
