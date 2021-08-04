import { withStyles, makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AccordionDetails from '@material-ui/core/AccordionDetails';

import Widget from './Widget';

import { MAIN_BORDER } from '../constants';

const useStyles = makeStyles((theme) => ({
  group: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.49,
    paddingLeft: 20,
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

const Group = (props) => {
  const classes = useStyles();
  const { group, widgets } = props;

  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.group}>{group}</Typography>
      </StyledAccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {widgets.map((widget) => (
            <Grid item key={widget.type} container justifyContent="center" alignItems="center" xs={6}>
              <Widget type={widget.type} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Group;
