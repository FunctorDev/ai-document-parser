import type { AxiosInstance, AxiosRequestConfig } from 'axios';

const makeRequest = (axiosInstance: AxiosInstance) => () => {
  return {
    get<TResponse = any, TParams = any>(
      url: string,
      params?: TParams,
      options: AxiosRequestConfig = {},
    ) {
      return axiosInstance.get<unknown, TResponse>(url, {
        ...options,
        params,
      });
    },

    post<TResponse = any, TData = any>(
      url: string,
      data?: TData,
      options: AxiosRequestConfig = {},
    ) {
      return axiosInstance.post<unknown, TResponse, TData>(url, data, {
        ...options,
      });
    },

    put<TResponse = any, TData = any>(
      url: string,
      data?: TData,
      options: AxiosRequestConfig = {},
    ) {
      return axiosInstance.put<unknown, TResponse, TData>(url, data, {
        ...options,
      });
    },

    delete<TResponse = any, TParams = any>(
      url: string,
      params?: TParams,
      options: AxiosRequestConfig = {},
    ) {
      return axiosInstance.delete<unknown, TResponse, TParams>(url, {
        ...options,
        params,
      });
    },

    custom<TResponse = any, TData = any>(config: AxiosRequestConfig) {
      return axiosInstance<unknown, TResponse, TData>(config);
    },

    getInstance() {
      return axiosInstance;
    },
  };
};

export default makeRequest;
