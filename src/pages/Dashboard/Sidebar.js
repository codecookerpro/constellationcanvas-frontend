import { styled, withStyles } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { LOGO_URL, DRAWER_WIDTH, APP_BAR_HEIGHT, MAIN_BORDER } from './constants';

import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledExpansion = withStyles({
  root: {
    boxShadow: 'none',
    borderBottom: MAIN_BORDER,
    borderTop: 'none',
    '&:before': {
      background: 'none',
    },
  },
  expanded: {
    margin: '0 !important',
  },
})(ExpansionPanel);

const StyledExpansionSummary = withStyles({
  root: {
    border: 'none',
  },
})(ExpansionPanelSummary);

function SimpleExpansionPanel(props) {
  return (
    <div>
      <StyledExpansion>
        <StyledExpansionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Figures (Lego)</Typography>
        </StyledExpansionSummary>
        <ExpansionPanelDetails>
          <Typography>123</Typography>
        </ExpansionPanelDetails>
      </StyledExpansion>
      <StyledExpansion>
        <StyledExpansionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Figures (Chess - White)</Typography>
        </StyledExpansionSummary>
        <ExpansionPanelDetails>
          <Typography>123</Typography>
        </ExpansionPanelDetails>
      </StyledExpansion>
    </div>
  );
}

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

const Sidebar = () => (
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
    <SimpleExpansionPanel />
  </Drawer>
);

export default Sidebar;
