import { ConfigProvider, Typography } from 'antd';
import React, { useMemo } from 'react';

import { HeadingLevel, HeadingProps } from './types';

const DEFAULT_FONT_WEIGHT = 600;

const Heading: React.FC<HeadingProps> = ({ level, ...props }) => {
  const themeTokenProps = useMemo(() => {
    const makeFontWeightStrong = (
      level?: HeadingLevel,
    ): { fontWeightStrong: number } => {
      const mapping = {
        1: 700,
        2: 700,
        3: 700,
        4: 900,
      };

      return {
        fontWeightStrong: level ? mapping[level] : DEFAULT_FONT_WEIGHT,
      };
    };

    return {
      fontSizeHeading1: 24,
      lineHeightHeading1: '32px',
      fontSizeHeading2: 20,
      lineHeightHeading2: '28px',
      fontSizeHeading3: 18,
      lineHeightHeading3: '24px',
      fontSizeHeading4: 14,
      lineHeightHeading4: '20px',
      ...makeFontWeightStrong(level),
    };
  }, [level]);

  return (
    <ConfigProvider
      theme={{
        token: themeTokenProps,
        components: {
          Typography: {
            titleMarginBottom: 0,
            titleMarginTop: 0,
          },
        },
      }}
    >
      <Typography.Title
        level={level}
        {...(props as React.ComponentProps<typeof Typography.Title>)}
      />
    </ConfigProvider>
  );
};

export default Heading;
