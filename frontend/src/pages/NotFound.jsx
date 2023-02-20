import { Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../components/common/GlobalStyle';

const ErrorAlert = styled(Row)`
  height: 100vh;
  font-size: 100px;
  font-weight: bolder;
  font-family: 'MaplestoryOTFBold';
  font-weight: bolder;
  color: white;
  background-color: #2b2b2b;
`;

export default function NotFound() {
  return (
    <>
      <GlobalStyle />
      <ErrorAlert align="middle" justify="center">
        NotFound
      </ErrorAlert>
    </>
  );
}
