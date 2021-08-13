import axios from "axios";
import { message } from "antd";
import store from "@/redux";
import { setToken } from "@/redux/actions/user";
import { useHistory } from "react-router";
// create an axios instance
const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

httpRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
httpRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.data) {
      if (error.response.data.code) {
        const errcode = error.response.data.code;
        if ([100300, 100305, 100306].includes(errcode)) {
          store.dispatch(setToken(""));
          useHistory().push("/login");
        }
      }
      message.error(error.response.data.msg, 1);
    }
    return Promise.reject(error);
  }
);

export default httpRequest;
