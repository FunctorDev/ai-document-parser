import { createSelector } from '@reduxjs/toolkit';
import { last } from 'ramda';

import { selectLoadingState } from '@/reducers/loading/selectors';
import type { RootState } from '@/types';

import { parseDocument } from './actions';
import { initialState, sliceKey } from './slice';

export const selectAIDocumentParserState = (state: RootState) =>
  state[sliceKey] || initialState;

export const isLoadingActionParserDocument = createSelector(
  selectLoadingState,
  loadingState => loadingState[parseDocument.typePrefix],
);

export const selectRepresentDocumentParser = createSelector(
  selectAIDocumentParserState,
  aiDocumentParserState => last(aiDocumentParserState.documents),
);
