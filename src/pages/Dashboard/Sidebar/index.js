import { styled } from '@material-ui/core/styles';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import WidgetPicker from './WidgetPicker';
import { LOGO_URL, DRAWER_WIDTH, APP_BAR_HEIGHT, MAIN_BORDER } from '../constants';

const useStyles = makeStyles((theme) => ({
  group: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.56,
    paddingLeft: 20,
    color: '#624ad7',
  },
  expand: {
    backgroundColor: '#E8DAEF',
    borderRadius: '8px',
  },
  detail: {
    width: '-webkit-fill-available',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 40,
    padding: `10px 18px 10px 0px`,
    backgroundColor: '#E8DAEF',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.49,
    paddingLeft: 40,
    color: '#6c6c6e',
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

const StyledAccordionDetails = withStyles({
  root: {
    padding: 0,
  },
})(AccordionDetails);

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

const canvases = [
  {
    title: 'Current State',
    active: true,
  },
  {
    title: 'Future State 1',
    active: false,
  },
  {
    title: 'Future State 2',
    active: false,
  },
];

const Sidebar = (props) => {
  const classes = useStyles();

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

      {/* Select Canvas Panel */}
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon className={classes.expand} />}>
          <Typography className={classes.group}>My Canvas</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <div className={classes.detail}>
            {canvases.map((c) => {
              return (
                <div className={classes.detailItem}>
                  <Typography className={classes.text}>{c.title}</Typography>
                  <ArrowForwardIosIcon fontSize="small" />
                </div>
              );
            })}
          </div>
        </StyledAccordionDetails>
      </StyledAccordion>

      {/* Select Toolbox Panel */}
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon className={classes.expand} />}>
          <Typography className={classes.group}>Toolbox</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <WidgetPicker />
        </StyledAccordionDetails>
      </StyledAccordion>

      {/* Select Participants Panel */}
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon className={classes.expand} />}>
          <Typography className={classes.group}>Participants</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>Me</StyledAccordionDetails>
      </StyledAccordion>
    </Drawer>
  );
};

export default Sidebar;
