import { ParagraphProps } from 'antd/es/typography/Paragraph';
import { TextProps } from 'antd/es/typography/Text';
import { HTMLProps, ReactNode } from 'react';

export type BodyVariant = 'extraLarge' | 'large' | 'regular' | 'small';
export type BodyStyledProps = Pick<BodyProps, 'variant'>;
export interface BodyProps extends ParagraphProps {
  variant?: BodyVariant;
}

export type BaseHeadlineVariant = 'regular' | 'bold';
export type HeadlineVariant = BaseHeadlineVariant | 'small';
export interface HeadlineProps {
  variant?: HeadlineVariant;
  className?: string;
  children: ReactNode;
}
export type TypographyStyledProps = Pick<HeadlineProps, 'variant'>;

export type HeadingLevel = 1 | 2 | 3 | 4;
export interface HeadingProps extends HTMLProps<HTMLElement> {
  level?: HeadingLevel;
  className?: string;
  variant?: string;
}

export type LabelVariant = 'large' | 'regular' | 'small';
export type LabelStyledProps = Pick<LabelProps, 'variant'>;
export interface LabelProps extends TextProps {
  variant?: LabelVariant;
}
