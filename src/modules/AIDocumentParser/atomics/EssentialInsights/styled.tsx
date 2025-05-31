import { Steps as AntdSteps, StepsProps } from 'antd';
import styled from 'styled-components/macro';

import { globalToken } from '@/bootstrap/Root';

export const Steps = styled(AntdSteps)<StepsProps>`
  &&& {
    .ant-steps-item-icon {
      background-color: #fef0e9;
      border-color: #fef0e9;
      font-weight: bold;
      font-size: 12px;
    }

    .ant-steps-icon {
      color: ${globalToken.colorPrimary} !important;
    }
  }
`;
