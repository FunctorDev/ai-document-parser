import { UploadFile } from 'antd';

import type {
  AIDocumentParserJobCheckErrorResponse,
  AIDocumentParserJobCheckSuccessResponse,
  AIParseDocumentResponse,
} from '@/types';

export enum AIDocumentParserType {
  FILE = 'file',
  URL = 'url',
}

export enum AIDocumentParserResultStatus {
  PROCESSING = 'processing',
}

type AIDocumentParserRequestBase = {
  progress: {
    percentage: number;
  };
};

type AIDocumentParserRequestProcessing = AIDocumentParserRequestBase & {
  status?: never;
};

type AIDocumentParserRequestFulfilled = AIDocumentParserRequestBase &
  AIParseDocumentResponse;

type AIDocumentParserRequest =
  | AIDocumentParserRequestProcessing
  | AIDocumentParserRequestFulfilled;

type AIDocumentParserResultProcessing = {
  status: AIDocumentParserResultStatus;
};

type AIDocumentParserResultSuccess = AIDocumentParserJobCheckSuccessResponse;

type AIDocumentParserResultError = AIDocumentParserJobCheckErrorResponse;

type AIDocumentParserResult =
  | AIDocumentParserResultProcessing
  | AIDocumentParserResultSuccess
  | AIDocumentParserResultError;

export type AIFileDocumentParser = {
  uid: string;
  response: AIDocumentParserResult;
  type: AIDocumentParserType.FILE;
  request: AIDocumentParserRequest & {
    file: UploadFile;
  };
};

export type AIUrlDocumentParser = {
  uid: string;
  response: AIDocumentParserResult;
  type: AIDocumentParserType.URL;
  request: AIDocumentParserRequest & {
    url: string;
  };
};

export type AIDocumentParser = AIFileDocumentParser | AIUrlDocumentParser;

export type AIDocumentParserState = {
  documents: AIDocumentParser[];
};

export type MimicParsingDocumentProgressPayload = {
  uid: string;
};

export type PollingParsingDocumentParserToFulfilledPayload = {
  requestId: string;
};

export type AddProcessingFileDocumentPayload = {
  file: UploadFile;
  uid: string;
};

export type AddProcessingUrlDocumentPayload = {
  url: string;
  uid: string;
};

export type SetParsingDocumentProgressPayload = {
  uid: string;
  percentage: number;
};

export type MarkDocumentAsFailedPayload = {
  uid: string;
  error: unknown;
};

export type ParseFileDocumentPayload = {
  file: UploadFile;
  uid: string;
};

export type ParseurlDocumentPayload = {
  url: string;
  uid: string;
};

export type ParseDocumentPayload =
  | {
      url: string;
    }
  | {
      file: UploadFile;
    };
