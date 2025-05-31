import { is, prop } from 'ramda';

import { _store } from './injectStore';

type ResponseMaybeWithRemainingCredits<T> = T & {
  remainingCredits?: number;
};

const setRemainingCreditsResponseInterceptor = async <T = unknown>(
  response: ResponseMaybeWithRemainingCredits<T>,
): Promise<T> => {
  const { actions: AuthActions } = await import('@/reducers/auth');

  const remainingCredits = prop('remainingCredits', response);

  if (is(Number, remainingCredits)) {
    _store.dispatch(
      AuthActions.setRemainingCredits({
        remainingCredits,
      }),
    );
  }

  return response;
};

export default setRemainingCreditsResponseInterceptor;
