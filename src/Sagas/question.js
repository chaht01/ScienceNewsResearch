import { delay } from "redux-saga";
import { call, put, race, takeLatest, take, all } from "redux-saga/effects";
import {
  types,
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
  questionQuestionCreateFailure,
  quesitonType
} from "../Actions/question";
import { takeMark, takeErase, takeCreateRequest } from "../Actions/take";
import {
  types as highlightTypes,
  questionHighlightSaveRequest,
  questionHighlightSaveSuccess,
  questionHighlightSaveFailure
} from "../Actions/questionHighlight";
import {
  types as modalTypes,
  questionModalFetchInquiriesSuccess,
  questionModalFetchInquiriesFailure,
  questionCRUDSubmitSuccess,
  questionCRUDSubmitFailure,
  questionModalClose
} from "../Actions/questionModal";
import { QuestionMock } from "./mock";
import Api from "../config/Api";
import { codes_combined, code1, code2 } from "./code";
import { isFunction as _isFunction } from "lodash";

function* fetchQuestionsAsync({
  type,
  payload: { research_id, created_phase }
}) {
  try {
    /*
    const questions = [
      QuestionMock.make({
        owner: localStorage.getItem("username"),
        created_step: 1,
        ...(() => {
          const target_code1 =
            codes_combined[Math.floor(Math.random() * codes_combined.length)];
          return {
            code_first: target_code1,
            code_second:
              !target_code1.code_second || target_code1.code_second.length === 0
                ? null
                : target_code1.code_second[
                    Math.floor(Math.random() * target_code1.code_second.length)
                  ]
          };
        })(),
        reftexts: [1, 4, 7]
      }),
      QuestionMock.make({
        created_step: 3,
        reftexts: [1, 4, 7],
        ...(() => {
          const target_code1 =
            codes_combined[Math.floor(Math.random() * codes_combined.length)];
          return {
            code_first: target_code1,
            code_second:
              !target_code1.code_second || target_code1.code_second.length === 0
                ? null
                : target_code1.code_second[
                    Math.floor(Math.random() * target_code1.code_second.length)
                  ]
          };
        })()
      }),
      QuestionMock.make({
        owner: localStorage.getItem("username"),
        ...(() => {
          const target_code1 =
            codes_combined[Math.floor(Math.random() * codes_combined.length)];
          return {
            code_first: target_code1,
            code_second:
              !target_code1.code_second || target_code1.code_second.length === 0
                ? null
                : target_code1.code_second[
                    Math.floor(Math.random() * target_code1.code_second.length)
                  ]
          };
        })(),
        created_step: 1
      }),
      QuestionMock.make({
        created_step: 4,
        ...(() => {
          const target_code1 =
            codes_combined[Math.floor(Math.random() * codes_combined.length)];
          return {
            code_first: target_code1,
            code_second:
              !target_code1.code_second || target_code1.code_second.length === 0
                ? null
                : target_code1.code_second[
                    Math.floor(Math.random() * target_code1.code_second.length)
                  ]
          };
        })(),
        reftexts: [1, 12, 18]
      }),
      QuestionMock.make({
        created_step: 3,
        ...(() => {
          const target_code1 =
            codes_combined[Math.floor(Math.random() * codes_combined.length)];
          return {
            code_first: target_code1,
            code_second:
              !target_code1.code_second || target_code1.code_second.length === 0
                ? null
                : target_code1.code_second[
                    Math.floor(Math.random() * target_code1.code_second.length)
                  ]
          };
        })(),
        reftexts: [12, 18]
      }),
      QuestionMock.make({
        owner: localStorage.getItem("username"),
        ...(() => {
          const target_code1 =
            codes_combined[Math.floor(Math.random() * codes_combined.length)];
          return {
            code_first: target_code1,
            code_second:
              !target_code1.code_second || target_code1.code_second.length === 0
                ? null
                : target_code1.code_second[
                    Math.floor(Math.random() * target_code1.code_second.length)
                  ]
          };
        })(),
        created_step: 1
      }),
      QuestionMock.make({
        owner: localStorage.getItem("username"),
        ...(() => {
          const target_code1 =
            codes_combined[Math.floor(Math.random() * codes_combined.length)];
          return {
            code_first: target_code1,
            code_second:
              !target_code1.code_second || target_code1.code_second.length === 0
                ? null
                : target_code1.code_second[
                    Math.floor(Math.random() * target_code1.code_second.length)
                  ]
          };
        })(),
        created_step: 1
      }),
      QuestionMock.make({
        created_step: 4,
        ...(() => {
          const target_code1 =
            codes_combined[Math.floor(Math.random() * codes_combined.length)];
          return {
            code_first: target_code1,
            code_second:
              !target_code1.code_second || target_code1.code_second.length === 0
                ? null
                : target_code1.code_second[
                    Math.floor(Math.random() * target_code1.code_second.length)
                  ]
          };
        })(),
        reftexts: [1, 27]
      }),
      QuestionMock.make({
        created_step: 3,
        ...(() => {
          const target_code1 =
            codes_combined[Math.floor(Math.random() * codes_combined.length)];
          return {
            code_first: target_code1,
            code_second:
              !target_code1.code_second || target_code1.code_second.length === 0
                ? null
                : target_code1.code_second[
                    Math.floor(Math.random() * target_code1.code_second.length)
                  ]
          };
        })(),
        reftexts: [27, 28]
      }),
      QuestionMock.make({
        owner: localStorage.getItem("username"),
        ...(() => {
          const target_code1 =
            codes_combined[Math.floor(Math.random() * codes_combined.length)];
          return {
            code_first: target_code1,
            code_second:
              !target_code1.code_second ||
              target_code1.code_second.length === 0 ||
              target_code1.code_second.length === 0
                ? null
                : target_code1.code_second[
                    Math.floor(Math.random() * target_code1.code_second.length)
                  ]
          };
        })(),
        created_step: 1
      })
    ];
    */
    let results = yield call(Api.question.pool, research_id);
    const questions = results.map(q => ({
      ...q
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
    yield call(delay, 1000);
    const question = yield call(Api.question.create, {
      text,
      created_phase,
      research
    });
    if (created_phase === 1)
      // TODO: is this place proper to do casual things?
      yield put(takeMark(article_id, question.id, created_phase));
    // local update
    else yield put(takeCreateRequest(article_id, question.id, created_phase));
    yield put(
      questionQuestionCreateSuccess({
        ...question
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
    yield call(delay, 1000); // Consume API
    const question = yield payload;
    yield put(questionQuestionUpdateSuccess(question));
  } catch (error) {
    yield put(questionQuestionUpdateFailure(error));
  }
}

function* deleteQuestionAsync({ type, payload }) {
  try {
    yield call(delay, 1000); // Consume API
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

function* questionModalInquiriesFetchAsync() {
  try {
    yield call(delay, 1000);
    const inquires = yield [
      { id: 1, text: " hello world" },
      { id: 2, text: " hello world2" },
      { id: 3, text: " hello world3" }
    ];
    yield put(questionModalFetchInquiriesSuccess(inquires));
  } catch (error) {
    yield put(questionModalFetchInquiriesFailure(error));
  }
}

export function* watchQuestionModalInquiriesFetchAsync() {
  yield takeLatest(
    modalTypes.QUESTION_MODAL_FETCH_INQUIRIES_REQUEST,
    questionModalInquiriesFetchAsync
  );
}

function* questionModalCRUDAsync({
  type,
  payload: {
    phase: created_step,
    question_id,
    typed,
    intention,
    code_first_id,
    code_second_id,
    group_inquries,
    openInstance,
    onSubmit
  }
}) {
  try {
    const newQuestion = yield call(Api.question.create, {
      text: typed,
      intention,
      created_step,
      code_first: code_first_id,
      code_second: code_second_id
    });

    if (question_id !== -1) {
      yield call(Api.question.update, {
        question_id,
        payload: {
          copied_to: newQuestion.id
        }
      });
      yield put(questionQuestionUpdateSuccess(question_id, newQuestion));
      yield put(questionQuestionCreateSuccess(newQuestion));
    } else {
      yield put(questionQuestionCreateSuccess(newQuestion));
      yield put(quesitonType("")); //clear type
    }
    yield put(questionCRUDSubmitSuccess());
    yield call(openInstance.handleClose);
    if (_isFunction(onSubmit)) {
      onSubmit(newQuestion);
    }
  } catch (error) {
    yield put(questionCRUDSubmitFailure(error));
  }
}

export function* watchQuestionModalCRUDAsync() {
  yield takeLatest(
    modalTypes.QUESTION_MODAL_CRUD_SUBMIT_REQUEST,
    questionModalCRUDAsync
  );
}

function* questionHighlightSaveAsync({
  type,
  payload: { question_id, sentence_ids }
}) {
  try {
    const reftexts = yield call(Api.question.update_reftexts, {
      question_id,
      payload: { sentence_ids }
    });

    yield put(questionHighlightSaveSuccess(question_id, reftexts));
  } catch (error) {
    yield put(questionHighlightSaveFailure(error));
  }
}

export function* watchQuestionHighlightSaveAsync() {
  yield takeLatest(
    highlightTypes.QUESTION_HIGHLIGHT_SAVE_REQUEST,
    questionHighlightSaveAsync
  );
}
