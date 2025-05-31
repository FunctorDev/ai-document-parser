import { UploadFile } from 'antd';
import React, { useCallback, useEffect } from 'react';

import { useAntdInjector } from '@/bootstrap/Injector';
import Page from '@/components/Page';
import {
  actions as AIDocumentParserActions,
  selectors as AIDocumentParserSelectors,
} from '@/reducers/aiDocumentParser';
import { useAppDispatch, useAppSelector } from '@/utils/redux-injectors';

import { EssentialInsights, Input, Onboarding, Output } from './atomics';

const AIDocumentParser: React.FC = () => {
  const { message } = useAntdInjector();
  const dispatch = useAppDispatch();

  const isParsing = useAppSelector(
    AIDocumentParserSelectors.isLoadingActionParserDocument,
  );

  const representDocument = useAppSelector(
    AIDocumentParserSelectors.selectRepresentDocumentParser,
  );

  const isParsed = representDocument?.response.status === 'ok';

  const handleUploadFileDocument = useCallback(
    async ({ file }: { file: UploadFile }) => {
      if (file.status === 'uploading') {
        try {
          await dispatch(
            AIDocumentParserActions.parseDocument({
              file,
            }),
          ).unwrap();

          message.success('Invoice has been parsed!', 2);
        } catch (error: any) {
          console.debug(error);
        }
      }
    },
    [dispatch, message],
  );

  const handleUploadUrlDocument = useCallback(
    async ({ url }: { url: string }) => {
      try {
        await dispatch(
          AIDocumentParserActions.parseDocument({
            url,
          }),
        ).unwrap();

        message.success('Invoice has been parsed!', 2);
      } catch (error: any) {
        console.debug(error);
      }
    },
    [dispatch, message],
  );

  useEffect(() => {
    return () => {
      dispatch(AIDocumentParserActions.clearAllDocuments());
    };
  }, [dispatch]);

  return (
    <Page title="AI Invoice Parser">
      <Onboarding />

      <div className="container w-full self-stretch flex flex-col">
        <div className="mb-0">
          <Input
            isParsing={isParsing}
            isParsed={isParsed}
            representDocument={representDocument}
            onUploadFileDocument={handleUploadFileDocument}
            onUploadUrlDocument={handleUploadUrlDocument}
          />
        </div>

        <div className="mb-5 relative z-10">
          <EssentialInsights isParsed={isParsed} />
        </div>

        <Output isParsed={isParsed} representDocument={representDocument} />
      </div>
    </Page>
  );
};

export default AIDocumentParser;
