import { styled } from '@material-ui/core/styles';

import MuiDrawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

import WidgetPicker from './WidgetPicker';

import { LOGO_URL, DRAWER_WIDTH, APP_BAR_HEIGHT, MAIN_BORDER } from '../constants';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
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

const Sidebar = (props) => {
  return (
    <Drawer variant="permanent" open={true}>
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
      <WidgetPicker />
    </Drawer>
  );
};

export default Sidebar;
