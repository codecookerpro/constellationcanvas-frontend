import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Box, Container } from '@material-ui/core';
import { Sidebar, Header, WidgetEditor } from 'components';
import { APP_BAR_HEIGHT } from 'constants/user-interface';
import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <GlobalStyle />
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          backgroundColor: 'white',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="xl" style={{ padding: 0, marginTop: APP_BAR_HEIGHT, height: `calc(100% - ${APP_BAR_HEIGHT}px)` }}>
          <WidgetEditor />
        </Container>
      </Box>
    </Box>
  );
}
