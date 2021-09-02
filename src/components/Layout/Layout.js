import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, CssBaseline } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components/macro';

import Sidebar from './Sidebar';
import Header from './Header';

import { Loader, Notifier } from 'components/auxiliary-components';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }

  @media print {
    body {
      visibility: hidden;
    }

    #widget-editor {
      visibility: visible;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'white',
  },
}));

export default function Layout({ sidebar, header, children }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <GlobalStyle />

      <Notifier />
      <Loader />

      <Grid container>
        <Grid item xs={12}>
          <Header type={header} />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" flexGrow={1}>
            {sidebar && <Sidebar />}
            <Box display="flex" flexGrow={1}>
              {children}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
