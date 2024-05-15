import { message } from "antd";
import axios from "axios";
import { getToken } from "../utils/user-token";
import { error } from "console";

const instance = axios.create({
  timeout: 10 * 1000,
});

// request拦截器 发请求之前带上token
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`; //JWT的固定格式
    return config;
  },
  (error) => Promise.reject(error)
);

// Response拦截器：统一处理 erron和msg
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;
  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg);
  }
  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
