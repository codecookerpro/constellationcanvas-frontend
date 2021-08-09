import React from 'react';
import { StylesProvider, ThemeProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro';
import { create } from 'jss';

import theme from 'theme';
import Routes from 'routes';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
});

const App = () => (
  <StylesProvider jss={jss}>
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <Routes />
      </StyledThemeProvider>
    </ThemeProvider>
  </StylesProvider>
);

export default App;
