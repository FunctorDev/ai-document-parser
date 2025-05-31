import { API_URL } from '@/constants/common';

import attachAccessTokenRequestInterceptor from './helpers/attachAccessTokenRequestInterceptor';
import makeAxios from './helpers/makeAxios';
import makeRequest from './helpers/makeRequest';

const axiosInstance = makeAxios({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  attachAccessTokenRequestInterceptor,
  error => Promise.reject(error),
);

const Request = makeRequest(axiosInstance);

export default Request;
