import { ConfigProvider, Typography } from 'antd';
import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { BodyProps, BodyStyledProps, BodyVariant } from './types';

const DEFAULT_FONT_SIZE = 14;
const DEFAULT_LINE_HEIGHT = '20px';
const DEFAULT_FONT_WEIGHT = 500;

const BodyStyled = styled(Typography.Paragraph)<BodyStyledProps>`
  ${props => {
    const makeFontWeight = (variant: BodyVariant) => {
      const mapping = {
        extraLarge: 500,
        large: 500,
        regular: 500,
        small: 400,
      };

      return css`
        font-weight: ${mapping[variant] || DEFAULT_FONT_WEIGHT};
      `;
    };
    return makeFontWeight(props.variant || 'regular');
  }}
`;

const Body: React.FC<BodyProps> = ({ variant = 'regular', ...props }) => {
  const themeToken = useMemo(() => {
    const makeVariant = (variant: BodyVariant) => {
      const makeFontSize = (variant: BodyVariant) => {
        const mapping = {
          extraLarge: 18,
          large: 16,
          regular: 14,
          small: 12,
        };

        return {
          fontSize: mapping[variant] || DEFAULT_FONT_SIZE,
        };
      };

      const makeLineHeight = (variant: BodyVariant) => {
        const mapping = {
          extraLarge: '24px',
          large: '22px',
          regular: '20px',
          small: '16px',
        };

        return {
          lineHeight: mapping[variant] || DEFAULT_LINE_HEIGHT,
        };
      };

      return {
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
      <BodyStyled {...props} variant={variant} />
    </ConfigProvider>
  );
};

export default Body;
