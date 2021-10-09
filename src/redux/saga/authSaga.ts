import { call, fork, put, take } from 'redux-saga/effects';
import { push } from "connected-react-router";

import { ResponseGenerator } from "model";
import authApi from "api/user/auth";
import { CookiesStorage } from "shared/config/cookie";
import { CookieKey, ROLE_TYPE } from "../../shared/constant/common";
import { authActions, LoginPayload } from "../reducer/authReducer";
import { PayloadAction } from "@reduxjs/toolkit";
import { ROUTER } from 'shared/constant/routes';


function* handleLogin(payload: LoginPayload) {
    const data = {
        email: payload?.email,
        password: payload?.password,
    }
    console.log("handleLogin");
    const loginApi = authApi.login(data);

    try {
        const response: ResponseGenerator = yield call(() => loginApi);

        if (response?.data.accessToken) {
            CookiesStorage.setAccessToken(response.data.accessToken);
            CookiesStorage.setRefreshToken(response.data.refreshToken);
            const isAdmin = response.data.role === ROLE_TYPE.ADMIN;
            yield put(authActions.loginSuccess({
                isAdmin: isAdmin,
            }));
            if (isAdmin) yield put(push(ROUTER.Dashboard))
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

function* watchLoginFlow() {
    while (true) {
        if (!CookiesStorage.getCookieData(CookieKey.accessToken)) {
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload);
        }
        yield take(authActions.logout.type);
        yield call(handleLogout);
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
}
