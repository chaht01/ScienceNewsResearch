import { delay } from "redux-saga";
import {
  all,
  call,
  fork,
  put,
  take,
  cancel,
  cancelled,
  takeLatest,
  select
} from "redux-saga/effects";
import {
  types as actionType,
  loginFail,
  loginSuccess,
  loginRequested,
  signupRequested,
  signupSuccess,
  signupFailure
} from "../Actions/auth";
import Api from "../config/Api";

export function* signup(username, password) {
  try {
    const user_detail = yield call(Api.authorize.signup, username, password);
    yield call(Api.storeItem, user_detail);
    yield put(signupSuccess(user_detail));
  } catch (error) {
    yield put(signupFailure(error));
  }
}

export function* signin(username, password) {
  try {
    const token = yield call(Api.authorize.auth, username, password);
    yield call(Api.storeItem, { token, username });
    const user_detail = yield call(Api.authorize.user, username);
    const profile = yield call(Api.authorize.profile, user_detail.profile);
    yield put(
      signupSuccess({
        ...user_detail,
        profile
      })
    );
    yield put(loginSuccess(token));
    return token;
  } catch (error) {
    yield put(loginFail(error));
    yield call(Api.clearItem, "token");
    yield call(Api.clearItem, "username");
  }
}

export function* signupFlow() {
  while (true) {
    const {
      payload: { username, password }
    } = yield take(actionType.AUTH_SIGNUP_REQUEST);

    const task = yield fork(signup, username, password);
    yield take([
      actionType.AUTH_SIGNUP_SUCCESS,
      actionType.AUTH_SIGNUP_FAILURE
    ]);
    yield cancel(task);
  }
}

export function* signinFlow() {
  while (true) {
    const {
      payload: { username, password }
    } = yield take(actionType.AUTH_LOGIN_REQUEST);
    const task = yield fork(signin, username, password);
    yield take([actionType.AUTH_LOGOUT, actionType.AUTH_LOGIN_FAILURE]);
    if (actionType === actionType.AUTH_LOGOUT) yield cancel(task);
    yield call(Api.clearItem, "token");
    yield call(Api.clearItem, "username");
  }
}
