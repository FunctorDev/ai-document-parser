import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

import { selectors as AuthSelectors } from '@/reducers/auth';

import { _store } from './injectStore';

const attachAccessTokenRequestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const makeHeaders = (headers: AxiosRequestHeaders): AxiosRequestHeaders => {
    const makeAuth = () => {
      return {
        Authorization: `Bearer ${AuthSelectors.selectAccessToken(
          _store.getState(),
        )}`,
      };
    };

    headers.set(makeAuth());

    return headers;
  };

  const headers = makeHeaders(config.headers);

  return {
    ...config,
    headers,
  };
};

export default attachAccessTokenRequestInterceptor;
