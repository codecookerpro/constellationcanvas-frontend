import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Snackbar, Backdrop, CircularProgress, CssBaseline } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components/macro';

import AccountBox from './AccountBox';
import Sidebar from './Sidebar';
import Title from 'components/form-components/Title';

import { HEADER_MAP as headers } from './constants';
import { SIDEBAR_WIDTH, HEADER_HEIGHT, MAIN_BORDER, PROJECT_TITLE } from 'utils/constants/ui';
import { setError } from 'actions';

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
    height: '100vh',
  },
  headerPane: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: HEADER_HEIGHT,
    borderBottom: MAIN_BORDER,
  },
  header: {
    flexGrow: 1,
  },
  account: {
    marginLeft: 'auto',
    marginRight: theme.spacing(7.5),
  },
  content: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
  },
}));

export default function Layout({ sidebar, header, children }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile, users } = useSelector((state) => state.auth);
  const { selectedParticipant } = useSelector((state) => state.board);
  const { loading, error } = useSelector((state) => state.aux);
  const Header = header.display && headers?.[header.type];
  const errorMsg = error?.data?.message || error?.data?.info;

  const handleToastyClose = () => {
    dispatch(setError(null));
  };

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <GlobalStyle />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={!!error}
        autoHideDuration={6000}
        onClose={handleToastyClose}
      >
        <Alert variant="filled" elevation={6} severity="error" onClose={handleToastyClose}>
          <AlertTitle>{error?.statusText}</AlertTitle>
          {Array.isArray(errorMsg) ? (
            <ul>
              {errorMsg.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          ) : (
            errorMsg
          )}
        </Alert>
      </Snackbar>

      {sidebar.display && (
        <Box className={classes.sidePane}>
          <Box className={classes.logo}>
            <Title>{PROJECT_TITLE}</Title>
          </Box>
          <Box className={classes.sidebar}>
            <Sidebar users={users} profile={profile} selectedParticipant={selectedParticipant} />
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
