import type { AIParseDocumentResponse, JobCheckResponse } from '@/types';

import Request from '../Request';
import Transformer from './transformer';
import type { JobCheckRequestParams, ParseDocumentRequestData } from './types';

const AIDocumentParserRequest = {
  parseDocument: async ({ file, url }: ParseDocumentRequestData) => {
    const data = new FormData();

    if (file) {
      data.append('file', file);
    }

    if (url) {
      data.append('file_url', url);
    }

    return Request()
      .post<AIParseDocumentResponse>('/doc/invoice/parse', data)
      .then(Transformer.parseDocument.then);
  },

  jobCheckDocument: async (requestId: JobCheckRequestParams) => {
    return Request()
      .get<JobCheckResponse>('/doc/invoice/parse', {
        requestId,
      })
      .then(Transformer.jobCheckDocument.then);
  },
};

export default AIDocumentParserRequest;
