import { ConfigProvider, Typography } from 'antd';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { LabelProps, LabelStyledProps, LabelVariant } from './types';

const DEFAULT_FONT_SIZE = 14;
const DEFAULT_LINE_HEIGHT = '20px';

const LabelStyled = styled(Typography.Text)<LabelStyledProps>`
  font-weight: 700;
`;

const Label: React.FC<LabelProps> = ({ variant = 'regular', ...props }) => {
  const themeToken = useMemo(() => {
    const makeVariant = (variant: LabelVariant) => {
      const makeFontSize = (variant: LabelVariant) => {
        const mapping = {
          large: 16,
          regular: 14,
          small: 12,
        };

        return {
          fontSize: mapping[variant] || DEFAULT_FONT_SIZE,
        };
      };

      const makeLineHeight = (variant: LabelVariant) => {
        const mapping = {
          large: '22px',
          regular: '20px',
          small: '16px',
        };

        return {
          lineHeight: mapping[variant] || DEFAULT_LINE_HEIGHT,
        };
      };

      return {
        fontWeightStrong: 700,
        ...makeFontSize(variant),
        ...makeLineHeight(variant),
      };
    };

    return {
      ...makeVariant(variant),
    };
  }, [variant]);

  return (
    <ConfigProvider
      theme={{
        token: themeToken,
      }}
    >
      <LabelStyled {...props} variant={variant} />
    </ConfigProvider>
  );
};

export default Label;
