import { ConfigProvider, Typography } from 'antd';
import React, { useMemo } from 'react';
import styled, { css } from 'styled-components/macro';

import {
  BaseHeadlineVariant,
  HeadlineProps,
  HeadlineVariant,
  TypographyStyledProps,
} from './types';

const DEFAULT_FONT_SIZE = 32;
const DEFAULT_LINE_HEIGHT = '44px';

const TypographyStyled = styled(Typography).attrs<TypographyStyledProps>(
  () => ({
    component: 'p',
    style: {},
  }),
)`
  ${props => {
    const makeFontWeight = (variant: BaseHeadlineVariant) => {
      const mapping: Record<BaseHeadlineVariant, number> = {
        regular: 700,
        bold: 900,
      };

      return css`
        font-weight: ${mapping[variant]};
      `;
    };

    const variant =
      props.variant === 'small' ? 'regular' : props.variant || 'regular';

    return makeFontWeight(variant);
  }}
`;

const Headline: React.FC<HeadlineProps> = ({
  variant = 'regular',
  ...props
}) => {
  const themeToken = useMemo(() => {
    const makeVariant = (variant: HeadlineVariant) => {
      const makeFontSize = (variant: HeadlineVariant) => {
        const mapping: Record<HeadlineVariant, number> = {
          regular: 32,
          bold: 32,
          small: 20,
        };

        return {
          fontSize: mapping[variant] || DEFAULT_FONT_SIZE,
        };
      };

      const makeLineHeight = (variant: HeadlineVariant) => {
        const mapping: Record<HeadlineVariant, string> = {
          regular: '44px',
          bold: '44px',
          small: '28px',
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
      <TypographyStyled {...props} variant={variant} />
    </ConfigProvider>
  );
};

export default Headline;
