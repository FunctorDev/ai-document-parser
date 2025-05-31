import { Carousel as AntdCarousel, CarouselProps } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

import { globalToken } from '@/bootstrap/Root';

export const GlobalStyle = createGlobalStyle`
  .js-onboarding-modal {
    .ant-modal-content {
      padding: 20px 24px !important;
      border-radius: 16px !important;
      
      .ant-modal-close {
        background: #fff !important;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        border: 1px solid #E4E4E9;
      }
    }
  }
`;

export const Carousel = styled(AntdCarousel)<CarouselProps>`
  &&& {
    .slick-dots {
      bottom: 72px;
      transform: translateY(-100%);

      > li {
        > button {
          background: ${globalToken.customs.gray['500']};
        }

        &.slick-active {
          > button {
            background: ${globalToken.colorPrimary};
          }
        }
      }
    }
  }
`;
