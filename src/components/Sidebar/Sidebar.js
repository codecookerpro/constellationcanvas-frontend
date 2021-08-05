import Toolbar from '@material-ui/core/Toolbar';
import MyCanvasPanel from './MyCanvasPanel';
import ParticipantPanel from './ParticipantPanel';
import ToolboxPanel from './ToolboxPanel';
import { LOGO_URL, APP_BAR_HEIGHT, MAIN_BORDER } from 'constants/user-interface';
import useStyles from './use-styles';
import { StyledDrawer } from './styled-components';

const Sidebar = () => {
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
      <div className={classes.sidebar}>
        <MyCanvasPanel />
        <ToolboxPanel />
        <ParticipantPanel />
      </div>
    </StyledDrawer>
  );
};

export default Sidebar;
