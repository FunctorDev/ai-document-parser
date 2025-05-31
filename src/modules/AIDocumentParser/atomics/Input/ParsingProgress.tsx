import { LoadingOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { globalToken } from '@/bootstrap/Root';
import * as InputStyled from '@/modules/AIDocumentParser/atomics/Input/styled';
import { AIDocumentParser } from '@/reducers/aiDocumentParser/types';

interface ParsingProgressProps {
  isParsing: boolean;
  representDocumentName?: string;
  representDocument?: AIDocumentParser;
}

const ParsingProgress: React.FC<ParsingProgressProps> = ({
  isParsing,
  representDocumentName,
  representDocument,
}) => {
  const progressKey = representDocument?.uid;

  const percent = representDocument?.request.progress.percentage || 0;

  return (
    <InputStyled.ParsingProcess
      className={classNames({
        '!hidden': !isParsing,
      })}
    >
      <div className="block">
        <div className="flex items-center gap-2">
          <LoadingOutlined className="text-xl text-primary-base" spin />

          <InputStyled.ParsingDocuments className="max-w-[280px] sm:max-w-[400px] lg:max-w-[450px]">
            <p>Processing {representDocumentName}</p>
          </InputStyled.ParsingDocuments>
        </div>

        <div className="min-w-[250px] w-full mt-1">
          <Progress
            key={progressKey}
            format={percent => percent?.toFixed(0) + '%'}
            status="active"
            percent={percent}
            size={['100%', 12]}
            strokeColor={globalToken.colorPrimary}
          />
        </div>
      </div>
    </InputStyled.ParsingProcess>
  );
};

export default ParsingProgress;
