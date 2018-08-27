import { delay } from "redux-saga";
import { call, put, race, takeLatest, take, all } from "redux-saga/effects";

import {
  codeFetchRequest,
  codeFetchSuccess,
  codeFetchFailure
} from "../Actions/code";
import { types } from "../Actions/code";
import Api from "../config/Api";
import { pick } from "lodash";

export const code1 = [
  { id: 1, text: "Understanding" },
  { id: 2, text: "Research" },
  { id: 3, text: "Extension" },
  { id: 4, text: "Does not fit into any" }
];
export const code2 = [
  { id: 1, text: "Understanding/code2.1", code_first: 1 },
  { id: 2, text: "Understanding/code2.2", code_first: 1 },
  { id: 3, text: "Understanding/code2.3", code_first: 1 },
  { id: 4, text: "Research/code2.1", code_first: 2 },
  { id: 5, text: "Research/code2.2", code_first: 2 },
  { id: 6, text: "Research/code2.3", code_first: 2 },
  { id: 7, text: "Extension/code2.1", code_first: 3 },
  { id: 8, text: "Extension/code2.2", code_first: 3 },
  { id: 9, text: "Extension/code2.3", code_first: 3 }
];

export const codes_combined = code1.map(code => ({
  ...code,
  code_second: code2.filter(code_2 => code_2.code_first === code.id)
}));

function* codeFetchAsync() {
  try {
    const codes = yield codes_combined;
    yield put(codeFetchSuccess(codes));
  } catch (error) {
    yield put(codeFetchFailure(error));
  }
}

export function* watchCodeFetchAsync() {
  yield takeLatest(types.CODE_FETCH_REQUEST, codeFetchAsync);
}
