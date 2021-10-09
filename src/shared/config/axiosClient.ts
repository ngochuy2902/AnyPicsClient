import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {BASE_URL} from "shared/constant/endpoints";
import { CookiesStorage } from "./cookie";
import { CookieKey } from "../constant/common";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': CookiesStorage.getCookieData(CookieKey.accessToken),
  }
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config: AxiosRequestConfig) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response: AxiosResponse) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axiosClient;
