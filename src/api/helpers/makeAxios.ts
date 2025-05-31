import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';

import { CustomAxiosError } from '@/types';

const makeAxios = (opts: CreateAxiosDefaults = {}): AxiosInstance => {
  const axiosInstance = axios.create(opts);

  axiosInstance.interceptors.request.use(
    config => {
      return config;
    },
    error => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    response => {
      return response.data;
    },
    (error: CustomAxiosError) => {
      error.fromAxiosInterceptor = true;
      error.statusCode = error.response?.status;

      throw error;
    },
  );

  return axiosInstance;
};

export default makeAxios;
