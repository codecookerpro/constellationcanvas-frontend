import React from 'react';
import { styled, withStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, Toolbar, Drawer as MuiDrawer, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LOGO_URL, DRAWER_WIDTH, APP_BAR_HEIGHT, MAIN_BORDER } from './constants';

const StyledAccordion = withStyles({
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
})(Accordion);

const StyledAccordionSummary = withStyles({
  root: {
    border: 'none',
  },
})(AccordionSummary);

function SimpleAccordion(props) {
  return (
    <div>
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Figures (Lego)</Typography>
        </StyledAccordionSummary>
        <AccordionDetails>
          <Typography>123</Typography>
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Figures (Chess - White)</Typography>
        </StyledAccordionSummary>
        <AccordionDetails>
          <Typography>123</Typography>
        </AccordionDetails>
      </StyledAccordion>
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
    <SimpleAccordion />
  </Drawer>
);

export default Sidebar;
