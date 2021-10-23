import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "shared/constant/endpoints";
import { CookiesStorage } from "./cookie";
import { CookieKey } from "../constant/common";
import { get } from "lodash";
import { push } from "connected-react-router";
import { ROUTER } from "shared/constant/routes";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: CookiesStorage.getCookieData(CookieKey.accessToken),
  },
});

function handleErrorStatus(error: any) {
  const status = error?.status || error?.response?.status || null;
  switch (status) {
    case 401:
      CookiesStorage.clearData();
      push(ROUTER.Login)
      return error.response;
    case 404:
      push(ROUTER.PageNotFound);
      return error;
    case 200:
    case 201:
    case 204:
    case 400:
    case 422:
      return error;
    default:
      CookiesStorage.setCookieData(
        CookieKey.networkError,
        status ? `ERR-0${status}` : "ERR-ANOTHER"
      );
      return error;
  }
}

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return handleErrorStatus(response);
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
