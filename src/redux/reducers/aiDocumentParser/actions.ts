import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { path, propOr } from 'ramda';

import AIDocumentParserRequest from '@/api/AIDocumentParserRequest';
import {
  calculateExponentialBackoff,
  delay,
  retryAsync,
  uuidv4,
} from '@/helpers/Common.helper';
import { actions as AppStateActions } from '@/reducers/appState';
import type {
  AIDocumentParserJobCheckErrorResponse,
  AIDocumentParserJobCheckSuccessResponse,
  AIParseDocumentResponse,
} from '@/types';

import type {
  AddProcessingFileDocumentPayload,
  AddProcessingUrlDocumentPayload,
  MarkDocumentAsFailedPayload,
  MimicParsingDocumentProgressPayload,
  ParseDocumentPayload,
  ParseFileDocumentPayload,
  ParseurlDocumentPayload,
  PollingParsingDocumentParserToFulfilledPayload,
  SetParsingDocumentProgressPayload,
} from './types';

export const addProcessingFileDocument = createAction(
  'aiDocumentParser/ADD_PROCESSING_FILE_DOCUMENT',
  (payload: AddProcessingFileDocumentPayload) => {
    return {
      payload,
    };
  },
);

export const addProcessingUrlDocument = createAction(
  'aiDocumentParser/ADD_PROCESSING_URL_DOCUMENT',
  (payload: AddProcessingUrlDocumentPayload) => {
    return {
      payload,
    };
  },
);

export const setParsingDocumentProgress = createAction(
  'aiDocumentParser/SET_PARSING_DOCUMENT_PROGRESS',
  (payload: SetParsingDocumentProgressPayload) => {
    return {
      payload,
    };
  },
);

export const markDocumentAsFailed = createAction(
  'aiDocumentParser/MARK_DOCUMENT_AS_FAILED',
  (payload: MarkDocumentAsFailedPayload) => {
    return {
      payload,
    };
  },
);

const mimicParsingDocumentProgress = createAsyncThunk(
  'aiDocumentParser/MIMIC_PARSING_DOCUMENT_PROGRESS',
  ({ uid }: MimicParsingDocumentProgressPayload, thunkAPI) => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = (Math.atan(elapsedTime / 1500) / (Math.PI / 2)) * 100;

      thunkAPI.dispatch(
        setParsingDocumentProgress({
          uid,
          percentage: progress,
        }),
      );
    }, 100);

    return async () => {
      clearInterval(interval);

      thunkAPI.dispatch(
        setParsingDocumentProgress({
          uid,
          percentage: 100,
        }),
      );

      await delay(1000);
    };
  },
);

const pollingParsingDocumentParserToFulfilled = createAsyncThunk(
  'aiDocumentParser/POLLING_PARSING_DOCUMENT_PARSER_TO_FULFILLED',
  async (
    { requestId }: PollingParsingDocumentParserToFulfilledPayload,
    thunkAPI,
  ) => {
    try {
      const backoff = calculateExponentialBackoff({
        // The number below has to be this exact value to properly calculate the backoff retry time
        // eslint-disable-next-line no-loss-of-precision
        factor: 1.2007566706419446962,
        minTimeout: 100,
      });

      const response = await retryAsync(
        async () => {
          const response =
            await AIDocumentParserRequest.jobCheckDocument(requestId);

          if (
            'status' in response &&
            (response.status === 'ok' || response.status === 'error')
          ) {
            return response;
          }

          throw new Error('Invoice document cannot be fulfilled');
        },
        {
          retries: 30,
          delayer: attempt => delay(backoff(attempt)),
        },
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const parseFileDocument = createAsyncThunk(
  'aiDocumentParser/PARSE_FILE_DOCUMENT',
  async ({ file, uid }: ParseFileDocumentPayload, thunkAPI) => {
    try {
      thunkAPI.dispatch(
        addProcessingFileDocument({
          uid,
          file,
        }),
      );

      const parseDocumentResponse = await AIDocumentParserRequest.parseDocument(
        {
          file: file.originFileObj,
        },
      );

      const pollingParsingDocumentParserToFulfilledResponse = await thunkAPI
        .dispatch(
          pollingParsingDocumentParserToFulfilled({
            requestId: parseDocumentResponse.requestId,
          }),
        )
        .unwrap();

      return {
        uid,
        request: parseDocumentResponse,
        response: pollingParsingDocumentParserToFulfilledResponse,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const parseurlDocument = createAsyncThunk(
  'aiDocumentParser/PARSE_URL_DOCUMENT',
  async ({ url, uid }: ParseurlDocumentPayload, thunkAPI) => {
    try {
      thunkAPI.dispatch(
        addProcessingUrlDocument({
          uid,
          url,
        }),
      );

      const parseDocumentResponse = await AIDocumentParserRequest.parseDocument(
        {
          url,
        },
      );

      const pollingParsingDocumentParserToFulfilledResponse = await thunkAPI
        .dispatch(
          pollingParsingDocumentParserToFulfilled({
            requestId: parseDocumentResponse.requestId,
          }),
        )
        .unwrap();

      return {
        uid,
        request: parseDocumentResponse,
        response: pollingParsingDocumentParserToFulfilledResponse,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const parseDocument = createAsyncThunk(
  'aiDocumentParser/PARSE_DOCUMENT',
  async (document: ParseDocumentPayload, thunkAPI) => {
    const uid = uuidv4();

    const parseDocument = async (document: ParseDocumentPayload) => {
      if ('file' in document) {
        return await thunkAPI
          .dispatch(
            parseFileDocument({
              uid,
              file: document.file,
            }),
          )
          .unwrap();
      }

      if ('url' in document) {
        return await thunkAPI
          .dispatch(
            parseurlDocument({
              uid,
              url: document.url,
            }),
          )
          .unwrap();
      }

      throw new Error('Invalid payload');
    };

    const transformResponse = async (result: {
      uid: string;
      request: AIParseDocumentResponse;
      response:
        | AIDocumentParserJobCheckSuccessResponse
        | AIDocumentParserJobCheckErrorResponse;
    }) => {
      if (result.response.status === 'error') {
        return Promise.reject({
          ...result,
          response: {
            data: {
              credits: result.response.credits,
              duration: result.response.jobDuration,
              remainingCredits: result.response.remaining_credits,
              status: result.response.status,
              message: result.response.message,
            },
          },
        });
      }

      return result;
    };

    const progressComplete = await thunkAPI
      .dispatch(
        mimicParsingDocumentProgress({
          uid,
        }),
      )
      .unwrap();

    try {
      const result = await parseDocument(document);

      const retvl = await transformResponse(result);

      await progressComplete();

      return retvl;
    } catch (error: unknown) {
      const normalizeError = (error: unknown) => {
        const errorGetter = (error: unknown) => {
          try {
            const _error =
              path(['response', 'data'], error) ||
              path(['response'], error) ||
              error;

            return JSON.parse(JSON.stringify(_error));
          } catch (error) {
            console.debug(error);

            return {
              message: propOr(
                'An unexpected error occurred! Please try again!',
                'message',
                error,
              ),
            };
          }
        };

        const appStateError: Record<string, unknown> = errorGetter(error);

        appStateError.zendeskSubject = 'PDF.co AI Invoice Parser error';

        return appStateError;
      };

      await progressComplete();

      thunkAPI.dispatch(
        markDocumentAsFailed({
          uid,
          error,
        }),
      );

      const appStateError = normalizeError(error);

      thunkAPI.dispatch(
        AppStateActions.appendError({
          error: appStateError,
        }),
      );

      return thunkAPI.rejectWithValue(error);
    }
  },
);
