import React from 'react';
import { StylesProvider, ThemeProvider as MuiThemeProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components/macro';
import { create } from 'jss';

import theme from 'theme';
import Routes from 'routes';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
});

const App = () => (
  <StylesProvider jss={jss}>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
);

export default App;
