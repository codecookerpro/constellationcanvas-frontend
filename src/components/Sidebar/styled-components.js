import { Accordion, AccordionSummary, AccordionDetails, Drawer } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MAIN_BORDER, DRAWER_WIDTH } from 'constants/user-interface';
import { styled } from '@material-ui/core';

export const GroupAccordion = withStyles({
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

export const GroupAccordionSummary = withStyles({
  root: {
    border: 'none',
    padding: '0 13px 0px 41px',
    minHeight: '60px !important',
  },
  content: {
    margin: 0,
  },
})(AccordionSummary);

export const GroupAccordionDetails = withStyles({
  root: {
    padding: 0,
    flexDirection: 'column',
  },
})(AccordionDetails);

export const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
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
