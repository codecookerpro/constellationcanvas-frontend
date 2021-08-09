import { styled, Toolbar, Drawer, makeStyles } from '@material-ui/core';
import { LOGO_URL, APP_BAR_HEIGHT, MAIN_BORDER, DRAWER_WIDTH } from 'constants/user-interface';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    maxHeight: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
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
}));

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const PageSidebar = (props) => {
  const classes = useStyles();

  return (
    <StyledDrawer variant="permanent" open={true}>
      <Toolbar
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          px: [1],
          minHeight: APP_BAR_HEIGHT,
          borderBottom: MAIN_BORDER,
        }}
      >
        <img src={LOGO_URL} alt="logo" />
      </Toolbar>
      <div className={classes.sidebar}>{props.sidebar}</div>
    </StyledDrawer>
  );
};

export default PageSidebar;
