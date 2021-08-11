import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { createGlobalStyle } from 'styled-components/macro';

import Logo from './Logo';
import AccountBox from './AccountBox';
import PageSidebar from './PageSidebar';

import { SIDEBAR_WIDTH, HEADER_HEIGHT, MAIN_BORDER } from 'constants/user-interface';

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

export default function PageBox(props) {
  const classes = useStyles();
  const name = useSelector((state) => state?.profile?.name);

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <GlobalStyle />
      <Box className={classes.sidePane}>
        <Box className={classes.logo}>
          <Logo />
        </Box>
        <Box className={classes.sidebar}>
          <PageSidebar />
        </Box>
      </Box>
      <Container className={classes.contentPane} maxWidth="xl">
        <Box className={classes.headerPane}>
          <Box className={classes.header}>{props.header}</Box>
          <Box className={classes.account}>
            <AccountBox displayName={name} />
          </Box>
        </Box>
        <Box className={classes.content}>{props.children}</Box>
      </Container>
    </Box>
  );
}
