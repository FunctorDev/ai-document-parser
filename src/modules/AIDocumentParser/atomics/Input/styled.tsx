import { Upload as AntdUpload } from 'antd';
import { DraggerProps } from 'antd/es/upload/Dragger';
import styled, { css } from 'styled-components/macro';

import { globalToken } from '@/bootstrap/Root';

export const InputOuter = styled.div`
  padding: 64px 0 16px 0;
  position: relative;
  background-image: linear-gradient(to right, #f1f1f1 1px, transparent 1px),
    linear-gradient(to bottom, #f1f1f1 1px, transparent 1px);
  background-size: 40px 40px;
`;

export const InputInner = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    54.28% 43.32% at 50% 38.2%,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 100%
  );

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 64px;
    bottom: 40px;
    width: 50%;
    background: #6270ea;
    opacity: 0.3;
    filter: blur(60px);
  }

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 64px;
    bottom: 40px;
    width: 50%;
    background: #a855f7;
    opacity: 0.3;
    filter: blur(60px);
  }
`;

export const UploadZoneWrapper = styled.div`
  overflow: hidden;
  position: relative;
  z-index: 10;
`;

export const UploadPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  height: 100%;
  pointer-events: none;
  width: 100%;
  overflow: hidden;
  transition: none;
`;

export const InitiateUploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  height: 100%;
  pointer-events: none;
`;

export const UploadDragging = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  gap: 16px;
  position: absolute;
  inset: 0;
  overflow: hidden;
  padding: 0 16px;
`;

export const Actionable = styled.div`
  pointer-events: auto;
`;

export const UploadZone = styled(AntdUpload.Dragger)<DraggerProps>`
  &&& {
    .ant-upload {
      padding: 0;

      ${props =>
        props.openFileDialogOnClick === false &&
        css`
          cursor: auto;
        `}
    }

    .ant-upload.ant-upload-drag {
      background: white;
      border: 1px solid #e4e4e9;
      border-radius: 16px;

      &.ant-upload-drag-hover {
        border-color: ${globalToken.colorPrimary};

        ${Actionable} {
          pointer-events: none;
        }

        ${InitiateUploadPlaceholder} {
          opacity: 0;
          visibility: hidden;
        }

        ${UploadPlaceholder} {
          opacity: 0;
          visibility: hidden;
        }

        ${UploadDragging} {
          display: flex;
        }
      }
    }
  }
`;

export const ParsingProcess = styled.div`
  background: white;
  border-radius: 12px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 16px;
  overflow: hidden;
  position: absolute;
  inset: 0;
`;

export const ParsingDocuments = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 100%;
  text-align: left;

  > p {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
