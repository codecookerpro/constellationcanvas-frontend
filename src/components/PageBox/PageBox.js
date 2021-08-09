import * as React from 'react';
import { CssBaseline, Box } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components/macro';

import PageSidebar from './PageSidebar';
import PageHeader from './PageHeader';
import PageContent from './PageContent';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

export default function PageBox(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <GlobalStyle />
      {props.sidebar && <PageSidebar sidebar={props.sidebar} />}
      {props.header && <PageHeader header={props.header} />}
      <PageContent content={props.children} />}
    </Box>
  );
}
