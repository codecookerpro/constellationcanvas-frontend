import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#624ad7',
    },
    secondary: {
      main: '#a3a3a3',
      contrastText: '#fff',
    },
  },
});

export default theme;
