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

function* fetchShownAsync({ type }) {
  yield call(delay, 1000);
  try {
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
        refText: [1, 4, 7]
      }),
      QuestionMock.make({
        created_step: 3,
        refText: [1, 4, 7],
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
        refText: [1, 12, 18]
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
        refText: [12, 18]
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
        refText: [1, 27]
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
        refText: [27, 28]
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
    let showns = questions.map(q =>
      ShownMock.make({ question: q, user: localStorage.getItem("username") })
    );
    showns = showns.map(s => ({
      ...s,
      takes: [TakeMock.make({ shown: s.id, taken: false })]
    }));

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
    yield call(delay, 1000);
    const newTake = yield TakeMock.make({ shown: shown_id, taken: true });
    const answerTexts = yield all(
      sentence_ids.map(sid =>
        AnswerTextMock.make({
          take: newTake.id,
          sentence: sid
        })
      )
    );
    newTake.answerTexts = answerTexts;
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
