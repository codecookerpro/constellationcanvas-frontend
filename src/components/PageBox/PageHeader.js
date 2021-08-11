import AppBar from '@material-ui/core/AppBar';
import { styled } from '@material-ui/core/styles';
import { DRAWER_WIDTH, APP_BAR_HEIGHT, MAIN_BORDER } from 'constants/user-interface';

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'white',
  boxShadow: 'none',
  borderBottom: MAIN_BORDER,
  height: APP_BAR_HEIGHT,
  justifyContent: 'center',
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function PageHeader(props) {
  return (
    <StyledAppBar position="absolute" open={true}>
      {props.header}
    </StyledAppBar>
  );
}
