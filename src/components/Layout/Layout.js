import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Snackbar, Backdrop, CircularProgress, CssBaseline } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components/macro';

import AccountBox from './AccountBox';
import Sidebar from './Sidebar';
import Title from 'components/form-components/Title';

import { HEADER_MAP as headers } from './constants';
import { SIDEBAR_WIDTH, HEADER_HEIGHT, MAIN_BORDER, PROJECT_TITLE } from 'constants/user-interface';
import { setError } from 'actions';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'white',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  sidePane: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: SIDEBAR_WIDTH,
    maxWidth: SIDEBAR_WIDTH,
    borderRight: MAIN_BORDER,
    height: '100vh',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    borderBottom: MAIN_BORDER,
    paddingLeft: 24,
  },
  sidebar: {
    flexGrow: 1,
    maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
    overflowX: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 4,
    },
  },
  contentPane: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  headerPane: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: HEADER_HEIGHT,
    borderBottom: MAIN_BORDER,
  },
  header: {
    flexGrow: 1,
  },
  account: {
    marginLeft: 'auto',
    marginRight: 60,
  },
  content: {
    flexGrow: 1,
  },
}));

export default function Layout({ sidebar, header, children }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const auxState = useSelector((state) => state.aux);
  const Header = header.display ? headers[header.type] : undefined;

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <GlobalStyle />
      <Backdrop className={classes.backdrop} open={auxState.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!auxState.error}
        autoHideDuration={6000}
        onClose={() => dispatch(setError(null))}
        message={auxState.error?.message || auxState.error?.info}
      />

      {sidebar.display && (
        <Box className={classes.sidePane}>
          <Box className={classes.logo}>
            <Title>{PROJECT_TITLE}</Title>
          </Box>
          <Box className={classes.sidebar}>
            <Sidebar />
          </Box>
        </Box>
      )}
      <Container className={classes.contentPane} maxWidth="xl">
        {header.display && (
          <Box className={classes.headerPane}>
            <Box className={classes.header}>
              <Header />
            </Box>
            <Box className={classes.account}>
              <AccountBox displayName={profile?.name} />
            </Box>
          </Box>
        )}
        <Box className={classes.content}>{children}</Box>
      </Container>
    </Box>
  );
}
