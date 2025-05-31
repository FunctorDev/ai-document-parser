import { createSlice } from '@/utils/@reduxjs/toolkit';

import * as AIDocumentParserActions from './actions';
import type {
  AIDocumentParserState,
  AIFileDocumentParser,
  AIUrlDocumentParser,
} from './types';
import { AIDocumentParserResultStatus, AIDocumentParserType } from './types';

export const initialState: AIDocumentParserState = {
  documents: [],
};

const aiDocumentParserSlice = createSlice({
  name: 'aiDocumentParser',
  initialState,
  reducers: {
    clearAllDocuments() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      AIDocumentParserActions.addProcessingFileDocument,
      (state, action) => {
        const processingDocument: AIFileDocumentParser = {
          uid: action.payload.uid,
          type: AIDocumentParserType.FILE,
          request: {
            file: action.payload.file,
            progress: {
              percentage: 0,
            },
          },
          response: {
            status: AIDocumentParserResultStatus.PROCESSING,
          },
        };

        state.documents.push(processingDocument);

        return state;
      },
    );

    builder.addCase(
      AIDocumentParserActions.addProcessingUrlDocument,
      (state, action) => {
        const processingDocument: AIUrlDocumentParser = {
          uid: action.payload.uid,
          type: AIDocumentParserType.URL,
          request: {
            url: action.payload.url,
            progress: {
              percentage: 0,
            },
          },
          response: {
            status: AIDocumentParserResultStatus.PROCESSING,
          },
        };

        state.documents.push(processingDocument);

        return state;
      },
    );

    builder.addCase(
      AIDocumentParserActions.setParsingDocumentProgress,
      (state, action) => {
        const document = state.documents.find(
          documentItem => documentItem.uid === action.payload.uid,
        );

        if (document) {
          document.request.progress.percentage = action.payload.percentage;
        }

        return state;
      },
    );

    builder.addCase(
      AIDocumentParserActions.markDocumentAsFailed,
      (state, action) => {
        const document = state.documents.find(
          documentItem => documentItem.uid === action.payload.uid,
        );

        if (document) {
          Object.assign(document, {
            status: 'error',
            error: action.payload.error,
          });
        }

        return state;
      },
    );

    builder.addCase(
      AIDocumentParserActions.parseDocument.fulfilled,
      (state, action) => {
        const document = state.documents.find(
          documentItem => documentItem.uid === action.payload.uid,
        );

        if (document) {
          Object.assign(document.request, action.payload.request);
          Object.assign(document.response, action.payload.response);
        }

        return state;
      },
    );
  },
});

export const { actions, reducer, name: sliceKey } = aiDocumentParserSlice;
