import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Sidebar from './Sidebar';
import Header from './Header';

const appBarHeight = 92;

export default function Dashboard({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
        <Container maxWidth="lg" style={{ padding: 0, marginTop: appBarHeight, height: `calc(100% - ${appBarHeight}px)` }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
