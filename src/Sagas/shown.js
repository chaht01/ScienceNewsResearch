import { delay } from "redux-saga";
import { call, put, race, takeLatest, take, all } from "redux-saga/effects";
import {
  types,
  shownAnswerDeleteFailure,
  shownAnswerDeleteRequest,
  shownAnswerDeleteSuccess,
  shownAnswerHighlightFailure,
  shownAnswerHighlightRequest,
  shownAnswerHighlightSuccess,
  shownFetchFailure,
  shownFetchRequest,
  shownFetchSuccess
} from "../Actions/shown";
import {
  ShownMock,
  QuestionMock,
  TakeMock,
  SentenceMock,
  AnswerTextMock
} from "./mock";
import Api from "../config/Api";
import { answerHighlightModeUndo } from "../Actions/answerHighlight";
import { code1, codes_combined } from "../Sagas/code";

function* fetchShownAsync({ type, payload: { call_cnt } }) {
  try {
    const showns = yield call(Api.take.list, call_cnt);
    yield put(shownFetchSuccess(showns));
  } catch (error) {
    yield put(shownFetchFailure(error));
  }
}

export function* watchFetchShownsAsync() {
  yield takeLatest(types.SHOWN_FETCH_REQUEST, fetchShownAsync);
}

function* createAnswerTextAsnyc({ type, payload: { take_id, sentencd_id } }) {
  yield call(delay, 1000);
  const newAnswerText = yield AnswerTextMock.make({
    take: take_id,
    sentence: sentencd_id
  });
  return newAnswerText;
}

function* answerHighlightOnShownAsync({
  type,
  payload: { shown_id, sentence_ids }
}) {
  try {
    const newTake = yield call(Api.take.highlight, {
      shown_id,
      payload: { sentence_ids }
    });
    yield put(shownAnswerHighlightSuccess(newTake));
    yield put(answerHighlightModeUndo());
  } catch (error) {
    yield put(shownAnswerHighlightFailure(error));
  }
}

export function* watchAnswerHighlightOnShownAsync() {
  yield takeLatest(
    types.SHOWN_ANSWER_HIGHLIGHT_REQEUST,
    answerHighlightOnShownAsync
  );
}
