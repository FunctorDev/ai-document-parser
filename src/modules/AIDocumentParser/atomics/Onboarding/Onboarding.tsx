import React, { useCallback, useEffect, useMemo } from 'react';

import {
  actions as AppStateActions,
  selectors as AppStateSelectors,
} from '@/reducers/appState';
import { selectors as AuthSelectors } from '@/reducers/auth';
import { User } from '@/types';
import { useAppDispatch, useAppSelector } from '@/utils/redux-injectors';

import OnboardingModal from './OnboardingModal';

const makeCloseOnboardingModalKey = (me: User) => {
  const myId = me.id;
  return `users::${myId}::ai-document-parser::onboarding_modal::closed`;
};

const Onboarding: React.FC = () => {
  const dispatch = useAppDispatch();

  const me = useAppSelector(AuthSelectors.selectAuthenticatedMe);

  const displayableOnboardingModal = useAppSelector(
    AppStateSelectors.selectDisplayableAIDocumentParserOnboardingModal,
  );

  const open = useMemo(() => {
    if (me) {
      return Boolean(displayableOnboardingModal);
    }

    return false;
  }, [displayableOnboardingModal, me]);

  const handleCancel = useCallback(() => {
    localStorage.setItem(makeCloseOnboardingModalKey(me), 'yes');
    dispatch(AppStateActions.displayAIDocumentParserOnboardingModal(false));
  }, [dispatch, me]);

  useEffect(() => {
    if (me) {
      const wasOpened =
        localStorage.getItem(makeCloseOnboardingModalKey(me)) === 'yes';

      if (wasOpened) {
        dispatch(AppStateActions.displayAIDocumentParserOnboardingModal(false));
      } else {
        dispatch(AppStateActions.displayAIDocumentParserOnboardingModal(true));
      }
    }
  }, []);

  return <OnboardingModal open={open} onCancel={handleCancel} />;
};

export default Onboarding;
