import React from 'react';
import { StylesProvider, ThemeProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro';
import { create } from 'jss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { usePreview } from 'react-dnd-preview';

import theme from 'theme';
import Routes from 'routes';
import { useInitApp } from 'hooks';
import { WIDGET_IMG_BASE_URL } from 'utils/constants';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
});

const DnDPreview = () => {
  const { display, item, style } = usePreview();

  if (!display) {
    return null;
  }

  return (
    <div style={style}>
      <img src={`${WIDGET_IMG_BASE_URL}${item.group}/${item.type}.${item.imageType}`} />
    </div>
  );
};

const App = () => {
  useInitApp();

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <DndProvider
            backend={'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? TouchBackend : HTML5Backend}
          >
            <DnDPreview />
            <Routes />
          </DndProvider>
        </StyledThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
