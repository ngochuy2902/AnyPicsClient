import axiosClient from "../../shared/config/axiosClient";
import {USER_LOGIN_ENDPOINT, USER_LOGOUT_ENDPOINT} from "shared/constant/endpoints";
import {FormLogin, TokenRes} from "model";

const authApi = {
    login(data: FormLogin) : Promise<TokenRes> {
        return axiosClient.post(USER_LOGIN_ENDPOINT, data);
    },
    logout() {
        return axiosClient.post(USER_LOGOUT_ENDPOINT);
    }
}

export default authApi
