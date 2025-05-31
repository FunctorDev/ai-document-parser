import { Editor as MonacoEditor } from '@monaco-editor/react';
import copy from 'copy-to-clipboard';
import { saveAs } from 'file-saver';
import { flatten } from 'flat';
import Papa from 'papaparse';
import React, { useCallback, useMemo } from 'react';

import { useAntdInjector } from '@/bootstrap/Injector';
import Button from '@/components/Core/Button';
import { ArrowDownIcon } from '@/components/Core/Icons';
import { Body, Heading, Label } from '@/components/Core/Typographies';
import { AIDocumentParser } from '@/reducers/aiDocumentParser/types';

const JSON_INDENT = 2;

interface OutputProps {
  representDocument?: AIDocumentParser;
  isParsed: boolean;
}

const Output: React.FC<OutputProps> = ({ representDocument, isParsed }) => {
  const { message } = useAntdInjector();

  const parsedData = useMemo(() => {
    if (isParsed && representDocument?.response.status === 'ok') {
      return representDocument?.response.body;
    }

    return null;
  }, [isParsed, representDocument]);

  const parsedDataStringify = useMemo(() => {
    if (parsedData) {
      return JSON.stringify(parsedData, null, JSON_INDENT);
    }
  }, [parsedData]);

  const handleCopyJSONResult = useCallback(() => {
    if (parsedDataStringify && copy(parsedDataStringify)) {
      message.success('Code has been copied!');
    }
  }, [message, parsedDataStringify]);

  const handleDownloadAsCsv = useCallback(() => {
    const makeOutputFileName = (representDocument?: AIDocumentParser) => {
      if (representDocument && 'file' in representDocument.request) {
        const fileName = representDocument?.request.file.name;

        if (fileName) {
          return fileName.replace(/\.[^/.]+$/, '');
        }
      }
    };

    const csv = Papa.unparse([flatten(parsedData)]);

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8',
    });

    const outputFileName = makeOutputFileName(representDocument);

    return saveAs(
      blob,
      [outputFileName, 'pdfco-ai-invoice-parser.csv'].filter(Boolean).join('-'),
    );
  }, [parsedData, representDocument]);

  if (isParsed) {
    return (
      <div className="flex flex-col flex-1 mb-8">
        <div className="flex items-center justify-between mb-5">
          <Heading level={2}>Parsing Result</Heading>

          <div>
            <Button
              size="small"
              variant="secondary"
              onClick={handleDownloadAsCsv}
            >
              <div className="flex items-center gap-1">
                <ArrowDownIcon />
                <Label variant="small" className="!text-current">
                  Download as CSV
                </Label>
              </div>
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col border border-neutral-200 rounded-xl overflow-hidden">
          <div className="flex lg:items-center lg:justify-between gap-4 pl-5 pr-3 py-3 border-b border-neutral-200 max-lg:flex-col">
            <div className="flex items-center gap-2">
              <Label>JSON</Label>

              <div
                onClick={handleCopyJSONResult}
                className="bg-gray-50 hover:bg-gray-100 py-2.5 px-3 rounded-lg cursor-pointer"
              >
                <Body variant="small" className="!m-0">
                  Copy Code
                </Body>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <MonacoEditor
              value={parsedDataStringify}
              language="json"
              options={{
                scrollBeyondLastLine: false,
                readOnly: true,
                domReadOnly: true,
                onDidAttemptReadOnlyEdit: () => false,
                minimap: {
                  enabled: false,
                },
                padding: {
                  top: 0,
                  bottom: 20,
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Output;
