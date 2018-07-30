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
  takeMark,
  takeErase,
  takeListFetchSuccess,
  takeListFetchFailure,
  takeCreateSuccess,
  takeCreateFailure,
  takeDeleteSuccess,
  takeDeleteFailure,
  takeTakeSaveSuccess,
  takeTakeSaveFailure,
  takeResponseUpdateSuccess,
  takeResponseUpdateFailure
} from "../Actions/take";
import Api from "../config/Api";
import { types } from "../Actions/take";

function* fetchTakesAsync({ type, payload }) {
  try {
    let takes = yield call(Api.take.list, payload.user_id);
    let upToDateTakes = takes
      .reduce((acc, curr) => {
        let contains = false;
        acc = acc.map(take => {
          if (
            take.article === curr.article &&
            take.question === curr.question
          ) {
            contains = true;
            return take.id < curr.id ? curr : take;
          }
          return take;
        });
        if (!contains) {
          acc.push(curr);
        }
        return acc;
      }, [])
      .filter(remote => !remote.remove);
    yield put(takeListFetchSuccess(upToDateTakes));
  } catch (error) {
    yield put(takeListFetchFailure(error));
  }
}

export function* watchFetchTakesAsync() {
  yield takeLatest(types.TAKE_LIST_FETCH_REQUEST, fetchTakesAsync);
}

function* createTakeAsync({
  type,
  payload: { article_id, question_id, phase }
}) {
  try {
    const take_created = yield call(
      Api.take.create,
      article_id,
      question_id,
      phase
    );
    yield put(takeCreateSuccess(take_created));
  } catch (error) {
    yield put(takeCreateFailure(error));
  }
}

export function* watchCreateTakeAsync() {
  yield takeEvery(types.TAKE_CREATE_REQUEST, createTakeAsync);
}

function* deleteTakeAsync({ type, payload: { id, removed_phase } }) {
  try {
    const take_deleted = yield call(Api.take.release, id, removed_phase);
    yield put(takeDeleteSuccess(take_deleted));
  } catch (error) {
    yield put(takeDeleteFailure(error));
  }
}

export function* watchDeleteTakeAsync() {
  yield takeEvery(types.TAKE_DELETE_REQUEST, deleteTakeAsync);
}

function* handleBundleTakeAsync({ type, payload: { to_create, to_delete } }) {
  try {
    yield all(
      to_create.map(({ article_id, question_id, phase }) =>
        call(createTakeAsync, {
          payload: { article_id, question_id, phase }
        })
      )
    );
    yield all(
      to_delete.map(({ id, removed_phase }) =>
        call(deleteTakeAsync, {
          payload: { id, removed_phase }
        })
      )
    );
    yield put(takeTakeSaveSuccess());
  } catch (error) {
    yield put(takeTakeSaveFailure(error));
  }
}

export function* watchHandleBundleTakeAsync() {
  yield takeEvery(types.TAKE_SAVE_REQUEST, handleBundleTakeAsync);
}

function* takeResponseUpdateAsync({ type, payload: { id: take_id, found } }) {
  try {
    const renewed_milestone = yield call(Api.take.update, take_id, found);
    yield put(takeResponseUpdateSuccess(renewed_milestone));
  } catch (error) {
    yield put(takeResponseUpdateFailure(error));
  }
}

export function* watchTakeResponseUpdateAsync() {
  yield takeLatest(types.TAKE_RESPONSE_UPDATE_REQUEST, takeResponseUpdateAsync);
}
