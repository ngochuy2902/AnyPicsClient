import { call, put, all, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";

import { ResponseGenerator } from "model";
import authApi from "api/user/auth";
import { CookiesStorage } from "shared/config/cookie";
import { ROLE_TYPE } from "../../shared/constant/common";
import { authActions, LoginPayload } from "../reducer/authReducer";
import { ROUTER } from "shared/constant/routes";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleLogin(action: PayloadAction<LoginPayload>) {
  const data = {
    email: action.payload.email,
    password: action.payload.password,
  };
  const loginApi = authApi.login(data);

  try {
    const response: ResponseGenerator = yield call(() => loginApi);

    if (response?.data.accessToken) {
      CookiesStorage.setAccessToken(response.data.accessToken);
      CookiesStorage.setRefreshToken(response.data.refreshToken);
      const isAdmin = response.data.role === ROLE_TYPE.ADMIN;
      yield put(
        authActions.loginSuccess({
          isAdmin: isAdmin,
        })
      );
      if (isAdmin) yield put(push(ROUTER.Dashboard));
      else yield put(push(ROUTER.Home));
    }
  } catch (error: any) {
    yield put(authActions.loginFailed());
  }
}

function* handleLogout() {
  const logoutApi = authApi.logout();

  try {
    yield call(() => logoutApi);
    CookiesStorage.clearData();

    yield put(push(ROUTER.Login));
  } catch (error) {
    yield put(authActions.logoutFailed());
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.login.type, handleLogin),
    takeLatest(authActions.logout.type, handleLogout),
  ]);
}
