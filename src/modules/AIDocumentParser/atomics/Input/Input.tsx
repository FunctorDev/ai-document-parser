import { UploadFile } from 'antd';
import { UploadRef } from 'antd/es/upload/Upload';
import classNames from 'classnames';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useAntdInjector } from '@/bootstrap/Injector';
import Button from '@/components/Core/Button';
import Card from '@/components/Core/Card';
import {
  ClipboardTextIcon,
  CloudArrowUpIcon,
  SparkleIcon,
} from '@/components/Core/Icons';
import { Body, Label } from '@/components/Core/Typographies';
import { customRequest } from '@/helpers/Upload.helper';
import InputLinkModal from '@/modals/InputLinkModal/InputLinkModal';
import ParsingProgress from '@/modules/AIDocumentParser/atomics/Input/ParsingProgress';
import { AIDocumentParser } from '@/reducers/aiDocumentParser/types';

import * as InputStyled from './styled';

interface InputProps {
  isParsing: boolean;
  isParsed: boolean;
  onUploadFileDocument: (args: { file: UploadFile }) => Promise<void>;
  onUploadUrlDocument: (args: { url: string }) => Promise<void>;
  representDocument?: AIDocumentParser;
}

const Input: React.FC<InputProps> = ({
  isParsing,
  isParsed,
  onUploadFileDocument,
  onUploadUrlDocument,
  representDocument,
}) => {
  const { message } = useAntdInjector();

  const $upload = useRef<UploadRef>(null);

  const [inputLinkModal, setInputLinkModal] = useState({
    open: false,
  });

  const representDocumentName = useMemo(() => {
    if (representDocument) {
      if ('file' in representDocument.request) {
        return representDocument.request.file.name;
      }

      return representDocument.request.url;
    }
  }, [representDocument]);

  const openFileDialog = useCallback(() => {
    // NOTE: Use this `as any` trick to bypass Typescript error `Property uploader is private and only accessible within class Upload`
    ($upload.current?.upload as any).uploader.fileInput.click();
  }, []);

  const beforeUpload = useCallback(
    (file: UploadFile) => {
      const isPdf = file.type === 'application/pdf';

      if (!isPdf) {
        message.error('File must be PDF.');
      }

      return isPdf;
    },
    [message],
  );

  const handleShowInputLinkModal = useCallback(() => {
    setInputLinkModal({
      open: true,
    });
  }, []);

  const handleInputLink = async (values: { url: string }) => {
    return onUploadUrlDocument({
      url: values.url,
    });
  };

  return (
    <InputStyled.InputOuter>
      <InputLinkModal
        {...inputLinkModal}
        onInput={handleInputLink}
        onCancel={() =>
          setInputLinkModal({
            open: false,
          })
        }
      />

      <InputStyled.InputInner />

      <Card
        classNames={{
          wrapper: 'relative z-20',
          card: '!border-0',
        }}
        bodyStyle={{
          padding: 0,
        }}
        $hasBorder={isParsed}
      >
        <InputStyled.UploadZoneWrapper>
          <InputStyled.UploadZone
            accept="application/pdf"
            ref={$upload}
            openFileDialogOnClick={!isParsed}
            fileList={[]}
            customRequest={customRequest}
            beforeUpload={beforeUpload}
            onChange={onUploadFileDocument}
            className={classNames({
              '!invisible !opacity-0': isParsing,
              '!cursor-auto': isParsed,
            })}
          >
            <InputStyled.UploadDragging>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <CloudArrowUpIcon className="text-primary text-2xl" />
              </div>

              <Label>Drop Your File Here</Label>
            </InputStyled.UploadDragging>

            {isParsed ? (
              <InputStyled.UploadPlaceholder>
                <div className="w-full flex justify-between items-center gap-4 max-md:flex-col">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                      <ClipboardTextIcon className="text-2xl" />
                    </div>

                    <div className="max-w-[280px] sm:max-w-[400px] lg:max-w-[450px] overflow-hidden pointer-events-auto">
                      <Label
                        variant="large"
                        ellipsis={{
                          tooltip: representDocumentName,
                        }}
                      >
                        {representDocumentName}
                      </Label>
                    </div>
                  </div>

                  <InputStyled.Actionable className="flex gap-3 flex-row md:flex-col lg:flex-row">
                    <Button
                      variant="tertiary"
                      onClick={handleShowInputLinkModal}
                      className="!w-40"
                    >
                      Insert Link
                    </Button>

                    <Button
                      variant="primary"
                      onClick={openFileDialog}
                      className="!w-40"
                    >
                      Change File
                    </Button>
                  </InputStyled.Actionable>
                </div>
              </InputStyled.UploadPlaceholder>
            ) : (
              <InputStyled.InitiateUploadPlaceholder>
                <div className="flex justify-between items-center gap-4 max-md:flex-col">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-50 p-3 flex items-center justify-center rounded-xl">
                      <SparkleIcon className="text-3xl text-indigo-500" />
                    </div>

                    <div className="text-left">
                      <Label variant="large">
                        Which Invoice Document Would You Like to Parse?
                      </Label>

                      <Body className="!text-neutral-500 !m-0">
                        Upload or drag your document here.
                      </Body>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-row md:flex-col lg:flex-row">
                    <InputStyled.Actionable
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    >
                      <Button
                        variant="tertiary"
                        onClick={handleShowInputLinkModal}
                        className="!w-44"
                      >
                        Insert Link
                      </Button>
                    </InputStyled.Actionable>

                    <Button variant="primary" className="!w-44">
                      Upload Document
                    </Button>
                  </div>
                </div>
              </InputStyled.InitiateUploadPlaceholder>
            )}
          </InputStyled.UploadZone>

          <ParsingProgress
            isParsing={isParsing}
            representDocumentName={representDocumentName}
            representDocument={representDocument}
          />
        </InputStyled.UploadZoneWrapper>
      </Card>
    </InputStyled.InputOuter>
  );
};

export default Input;
