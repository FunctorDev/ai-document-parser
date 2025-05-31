import { head, join, pipe, split, tail } from 'ramda';

import type { AIParseDocumentResponse, JobCheckResponse } from '@/types';

import setErrorResponseInterceptor from '../helpers/setErrorResponseInterceptor';
import setRemainingCreditsResponseInterceptor from '../helpers/setRemainingCreditsResponseInterceptor';

const mimicInterceptor = {
  then: setRemainingCreditsResponseInterceptor<AIParseDocumentResponse>,
  catch: setErrorResponseInterceptor,
};

const Transformer = {
  parseDocument: mimicInterceptor,
  jobCheckDocument: {
    then: (response: JobCheckResponse) => {
      if ('errorName' in response && response.status === 'error') {
        response.errorName = pipe(split(':'), head<string>)(response.message);

        response.message = pipe(
          split(': '),
          tail,
          join(': '),
        )(response.message);
      }

      return setRemainingCreditsResponseInterceptor(response);
    },
  },
};

export default Transformer;
