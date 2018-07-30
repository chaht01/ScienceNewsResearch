import { delay } from "redux-saga";
import { call, put, race, takeLatest, take, all } from "redux-saga/effects";

import {
  pageNextRequest,
  pageNextSuccess,
  pageNextFailure
} from "../Actions/page";
import { types } from "../Actions/page";
import Api from "../config/Api";
import { pick } from "lodash";

function* nextPageAsync({ type, payload: { page, actionsBindParams } }) {
  try {
    yield all(actionsBindParams.map(fn => put(fn())));
    yield put(pageNextSuccess());
  } catch (error) {
    yield put(pageNextFailure());
  }
}

export function* watchNextPageAsync() {
  yield takeLatest(types.PAGE_NEXT_REQUEST, nextPageAsync);
}
