import React from 'react';
import _ from 'lodash';
import { styled, withStyles, makeStyles } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LOGO_URL, DRAWER_WIDTH, APP_BAR_HEIGHT, MAIN_BORDER } from './constants';
import { WIDGET_TYPES as WIDGETS } from 'components/WidgetEditor/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
    overflow: 'auto',
  },
  widget: {
    width: 97,
    height: 124,
    backgroundColor: '#f6f8fa',
    '&:hover': {
      borderRadius: 3,
      border: 2,
      borderColor: '#f2a912',
    },
  },
}));

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
  const classes = useStyles();
  const { widgets } = props;

  const groupedWidgets = _.groupBy(widgets, 'group');

  return (
    <div className={classes.root}>
      {Object.keys(groupedWidgets).map((group) => (
        <StyledAccordion key={group}>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{group}</Typography>
          </StyledAccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              {groupedWidgets[group].map((widget) => (
                <Grid item key={widget.type} container justifyContent="center" alignItems="center" xs={6}>
                  <img className={classes.widget} src={`public/assets/img/widgets/${widget.type}`} alt={widget.type} />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </StyledAccordion>
      ))}
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
    <SimpleAccordion widgets={WIDGETS} />
  </Drawer>
);

export default Sidebar;
