import { createTheme } from '@material-ui/core/styles';

const palette = {
  primary: {
    main: '#624ad7',
  },
  secondary: {
    main: '#a3a3a3',
    contrastText: '#fff',
  },
  info: {
    main: '#4a95d7',
    contrastText: '#fff',
  },
};

export const desktopTheme = createTheme({
  palette,
});

export const touchTheme = createTheme({
  palette,
  spacing: 2,
});

export default desktopTheme;
