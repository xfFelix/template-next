// utils/axios.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { notification } from 'antd';
import { redirect } from 'next/navigation';
import { getToken, logout } from '@/utils/login';
import { ErrorCodeMap } from '@/constants/ErrorCode';
import { LogoutCodeList } from '@/constants/Router';

console.log(process.env.CONTEXT_ENV);

const obj = {
  dev: 'https://open-console-api.test.bhbapp.cn',
  test: 'https://open-console-api.test.bhbapp.cn',
  gray: 'https://open-console-api.bj.gray.bhbapp.cn',
  prod: 'https://open-console-api.bhbapp.cn',
};

// 创建实例
const service: AxiosInstance = axios.create({
  baseURL: obj[process.env.CONTEXT_ENV as keyof typeof obj] || 'https://open-console-api.test.bhbapp.cn', // 环境变量
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data, config } = response;
    if (status >= 200 && status < 300) {
      // 如果是code为0或者responseType为blob
      if (data.code === 0 || config.responseType === 'blob') {
        return data;
      }
      if (data.code !== 0) {
        if (typeof window !== 'undefined') {
          // 未登录
          if (LogoutCodeList.includes(data.code)) {
            logout();
            redirect('/login');
          } else {
            // notification.error({
            //   message: '错误',
            //   description: ErrorCodeMap[response.data.code] || response.data.message,
            // });
          }
        }
      }
      return Promise.reject(response.data);
    }
    return Promise.reject(new Error(`Error: ${response.config.url}:${response.status}`));
  },
  error => {
    if (error.response?.status === 401) {
      // 例如：未登录
      if (typeof window !== 'undefined') {
        redirect('/login');
      }
    }

    // if (typeof window !== 'undefined') {
    //   notification.error({ message: '错误', description: error.message });
    // }
    return Promise.reject(error);
  }
);

export default service;
