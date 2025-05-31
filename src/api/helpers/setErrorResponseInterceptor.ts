import { AxiosError } from 'axios';

import { actions as AppStateActions } from '@/reducers/appState';

import { _store } from './injectStore';

const setErrorResponseInterceptor = (error: AxiosError): never => {
  _store.dispatch(
    AppStateActions.appendError({
      error,
    }),
  );

  throw error;
};

export default setErrorResponseInterceptor;
