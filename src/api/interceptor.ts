import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

interface ErrorResponse {
  reason: string;
  msg: string;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

// add response interceptors
axios.interceptors.response.use(
  (res) => {
    if (res.status !== 200) {
      Message.error({
        content: (res.data as ErrorResponse).msg || 'Error',
        duration: 5 * 1000,
      });
      return Promise.reject(
        new Error((res.data as ErrorResponse).msg || 'Error')
      );
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.response.data.msg || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
