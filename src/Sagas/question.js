import { delay } from "redux-saga";
import { call, put, race, takeLatest, take } from "redux-saga/effects";
import {
  questionPoolFetchRequest,
  questionPoolFetchSuccess,
  questionPoolFetchFailure,
  questionQuestionUpdateRequest,
  questionQuestionUpdateSuccess,
  questionQuestionUpdateFailure,
  questionQuestionDeleteRequest,
  questionQuestionDeleteSuccess,
  questionQuestionDeleteFailure,
  questionQuestionCreateSuccess,
  questionQuestionCreateFailure
} from "../Actions/question";
import { takeMark, takeErase, takeCreateRequest } from "../Actions/take";
import { types } from "../Actions/question";
import { QuestionMock } from "./mock";
import tinycolor from "tinycolor2";
import Api from "../config/Api";

function* fetchQuestionsAsync({ type, payload }) {
  try {
    let results = yield call(Api.question.pool, payload.id);
    const questions = results.map(q => ({
      ...q,
      color: tinycolor.random().toHex()
    }));
    yield put(questionPoolFetchSuccess(questions));
  } catch (error) {
    yield put(questionPoolFetchFailure(error));
  }
}

export function* watchFetchQuestionsAsync() {
  yield takeLatest(types.POOL_FETCH_REQUEST, fetchQuestionsAsync);
}

function* createQuestionAsync({
  type,
  payload: { text, phase: created_phase, research_id: research, article_id }
}) {
  try {
    const question = yield call(Api.question.create, {
      text,
      created_phase,
      research
    });
    if (created_phase === 1)
      yield put(takeMark(article_id, question.id, created_phase));
    // local update
    else yield put(takeCreateRequest(article_id, question.id, created_phase));
    yield put(
      questionQuestionCreateSuccess({
        ...question,
        color: tinycolor.random().toHex()
      })
    );
  } catch (error) {
    yield put(questionQuestionCreateFailure(error));
  }
}

export function* watchCreateQuestionsAsync() {
  yield takeLatest(types.QUESTION_CREATE_REQUEST, createQuestionAsync);
}

function* updateQuestionAsync({ type, payload }) {
  try {
    yield call(delay, 100); // Consume API
    const question = yield payload;
    yield put(questionQuestionUpdateSuccess(question));
  } catch (error) {
    yield put(questionQuestionUpdateFailure(error));
  }
}

function* deleteQuestionAsync({ type, payload }) {
  try {
    yield call(delay, 100); // Consume API
    const question = yield payload;
    yield put(questionQuestionDeleteSuccess(question));
  } catch (error) {
    yield put(questionQuestionDeleteFailure(error));
  }
}

export function* watchHandleQuestionAsync() {
  while (true) {
    const action = yield take([
      types.QUESTION_UPDATE_REQUEST,
      types.QUESTION_DELETE_REQUEST
    ]);
    if (action.type === types.QUESTION_UPDATE_REQUEST) {
      yield call(updateQuestionAsync, action);
    } else {
      yield call(deleteQuestionAsync, action);
    }
  }
}
