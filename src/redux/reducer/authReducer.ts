import { IsAdmin } from "model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { CookiesStorage } from "../../shared/config/cookie";

export interface AuthState {
    isLoggedIn: boolean;
    isLoading: boolean;
    isAdmin: boolean;
    isError: boolean;
    messageError: string;
    values: { [key: string]: any };
}

export interface LoginPayload {
    email: string;
    password: string;
}

const initialState: AuthState = {
    isLoggedIn: CookiesStorage.getAccessToken() != null,
    isAdmin: false,
    isLoading: false,
    isError: false,
    messageError: '',
    values: {},
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.isLoading = true;
            state.values = action.payload;
        },
        loginSuccess(state, action: PayloadAction<IsAdmin>) {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.values = {};
            state.isAdmin = action.payload.isAdmin;
        },
        loginFailed(state) {
            state.isLoading = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.isAdmin = false;
            state.values = {};
        },
        logoutFailed(state) {
            state.isLoggedIn = true;
        },
    },
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;
export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
