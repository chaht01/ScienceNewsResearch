import { delay } from "redux-saga";
import {
  call,
  put,
  race,
  takeLatest,
  take,
  takeEvery,
  all
} from "redux-saga/effects";
import {
  highlightHighlightDeleteFailure,
  highlightHighlightDeleteSuccess,
  highlightHighlightFetchFailure,
  highlightHighlightFetchSuccess,
  highlightHighlightCreateSuccess,
  highlightHighlightCreateFailure,
  highlightHighlightCreateRequest,
  highlightHighlightDeleteRequest,
  highlightHighlightSaveFailure,
  highlightHighlightSaveSuccess,
  highlightHighlightUpdateFailure,
  highlightHighlightUpdateSuccess
} from "../Actions/highlight";
import { types } from "../Actions/highlight";
import { HighlightMock } from "./mock";
import Api from "../config/Api";

const remote_highlights = [
  HighlightMock.make({ article_id: 1, question_id: 1, sentence_id: 1 }),
  HighlightMock.make({ article_id: 1, question_id: 1, sentence_id: 2 }),
  HighlightMock.make({ article_id: 1, question_id: 1, sentence_id: 8 }),
  HighlightMock.make({ article_id: 1, question_id: 2, sentence_id: 3 }),
  HighlightMock.make({ article_id: 1, question_id: 2, sentence_id: 4 }),
  HighlightMock.make({ article_id: 1, question_id: 3, sentence_id: 13 }),
  HighlightMock.make({ article_id: 1, question_id: 4, sentence_id: 5 }),
  HighlightMock.make({ article_id: 1, question_id: 4, sentence_id: 6 }),
  HighlightMock.make({ article_id: 1, question_id: 5, sentence_id: 10 })
];

function* fetchHighlightsAsync({ type, payload }) {
  try {
    yield call(delay, 100);
    const highlights = yield remote_highlights.filter(
      h => h.article_id === payload.article_id
    );
    yield put(highlightHighlightFetchSuccess(highlights));
  } catch (error) {
    yield put(highlightHighlightFetchFailure(error));
  }
}

export function* watchFetchHighlightsAsync() {
  yield takeLatest(types.HIGHLIGHT_FETCH_REQUEST, fetchHighlightsAsync);
}

function* createHighlightAsync({
  type,
  payload: { article_id, question_id, sentence_id }
}) {
  try {
    yield call(delay, 100);
    const highlight_created = yield HighlightMock.make({
      article_id,
      question_id,
      sentence_id
    });
    yield put(highlightHighlightCreateSuccess(highlight_created));
  } catch (error) {
    yield put(highlightHighlightCreateFailure(error));
  }
}

export function* watchCreateHighlightAsync() {
  yield takeEvery(types.HIGHLIGHT_CREATE_REQUEST, createHighlightAsync);
}

function* deleteHighlightAsync({ type, payload }) {
  try {
    yield call(delay, 100); // Consume API
    const highlight_deleted = yield payload;
    yield put(highlightHighlightDeleteSuccess(highlight_deleted));
  } catch (error) {
    yield put(highlightHighlightDeleteFailure(error));
  }
}

export function* watchDeleteHighlightAsync() {
  yield takeEvery(types.HIGHLIGHT_DELETE_REQUEST, deleteHighlightAsync);
}

function* handleBundleHighlightAsync({
  type,
  payload: { id, found, sentences }
}) {
  try {
    const milestone = yield call(Api.take.highlight, id, found, sentences);
    yield put(highlightHighlightSaveSuccess(milestone));
  } catch (error) {
    yield put(highlightHighlightSaveFailure(error));
  }
}
export function* watchHandleBundleHighlightAsync() {
  yield takeEvery(types.HIGHLIGHT_SAVE_REQUEST, handleBundleHighlightAsync);
}
