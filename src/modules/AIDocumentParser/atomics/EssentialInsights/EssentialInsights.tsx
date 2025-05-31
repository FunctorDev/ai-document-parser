import { Collapse } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { CaretDownIcon } from '@/components/Core/Icons';
import { Body } from '@/components/Core/Typographies';
import { listTools } from '@/constants/apiTools';

import * as EssentialInsightsStyled from './styled';

interface EssentialInsightsProps {
  isParsed: boolean;
}

const EssentialInsights: React.FC<EssentialInsightsProps> = ({ isParsed }) => {
  const [activeKey, setActiveKey] = useState<string | string[]>([
    'essential_insights',
  ]);

  useEffect(() => {
    if (isParsed) {
      setActiveKey([]);
    }
  }, [isParsed]);

  return (
    <Collapse
      bordered={false}
      activeKey={activeKey}
      onChange={setActiveKey}
      size="large"
      expandIcon={({ isActive }) => (
        <CaretDownIcon
          className={classNames('transition text-[20px]', {
            'rotate-180': isActive,
          })}
        />
      )}
      expandIconPosition="end"
      style={{
        border: '1px solid #e4e4e9',
        background: '#ffffff',
      }}
      items={[
        {
          key: 'essential_insights',
          label: (
            <Body variant="large" className="!m-0">
              What you need to know about our AI Invoice Parser
            </Body>
          ),
          children: (
            <EssentialInsightsStyled.Steps
              current={undefined}
              direction="vertical"
              items={[
                {
                  title: (
                    <div>
                      <Body
                        variant="large"
                        className="!text-gray-500 !m-0 !leading-[inherit]"
                      >
                        Only invoices will be parsed. For all other documents,
                        please use our existing{' '}
                        <a
                          href={
                            'href' in listTools.documentParserManager
                              ? listTools.documentParserManager.href
                              : undefined
                          }
                          target="_blank"
                          className="!underline text-primary-base"
                          rel="noreferrer"
                        >
                          Document Parser.
                        </a>
                      </Body>
                    </div>
                  ),
                  description: <span className="invisible">Invisible</span>,
                },

                {
                  title: (
                    <div>
                      <Body
                        variant="large"
                        className="!text-gray-500 !m-0 !leading-[inherit]"
                      >
                        We only process a single invoice at a time. If your PDF
                        has multiple invoices, please split it first using our{' '}
                        <a
                          href="https://developer.pdf.co/api/pdf-split"
                          target="_blank"
                          className="!underline text-primary-base"
                          rel="noreferrer"
                        >
                          PDF Split API.
                        </a>
                      </Body>
                    </div>
                  ),
                },
              ]}
            />
          ),
        },
      ]}
    />
  );
};

export default EssentialInsights;
