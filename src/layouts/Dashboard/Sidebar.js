import { styled, withStyles } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { LOGO_URL } from 'constants/assets';

import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledExpansion = withStyles({
  root: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
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

const drawerWidth = 308;
const appBarHeight = 92;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
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
        minHeight: appBarHeight,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <img src={LOGO_URL} alt="logo" />
    </Toolbar>
    <SimpleExpansionPanel />
  </Drawer>
);

export default Sidebar;
