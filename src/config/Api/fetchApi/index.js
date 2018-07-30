import axios from "axios";
import store from "../../../store";
import apiConfig from "../config";
import { logout, unauthorized } from "../../../Actions/auth";

const fetchApi = (
  endPoint,
  payload = {},
  method = "get",
  config = {},
  headers = {},
  contentType = "application/json"
) => {
  const accessToken = localStorage.getItem("token");
  const instance = axios.create({
    baseURL: apiConfig.url,
    headers: accessToken
      ? {
          Authorization: "JWT " + accessToken,
          "content-type": contentType
        }
      : headers
  });
  const requestStack = [];
  instance.interceptors.request.use(config => {
    // requestStack.push(config);
    return config;
  });
  return instance
    .request({
      method: method,
      url: `${endPoint}`,
      data: payload,
      ...config
    })
    .then(res => res.data)
    .catch(err => {
      if (err.response.status === 401) {
        store.dispatch(unauthorized());
        throw {
          status: 401,
          data: requestStack
        };
      } else {
        throw {
          ...err.response
        };
      }
    });
};

export default fetchApi;
