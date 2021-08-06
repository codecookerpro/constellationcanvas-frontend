import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Widget from './Widget';
import { StyledAccordion, StyledAccordionSummary, StyledAccordionDetails } from './styled-components';
import useStyles from '../use-styles';

const WidgetGroup = ({ group, widgets }) => {
  const classes = useStyles();

  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.subGroup}>{group}</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Grid container spacing={3}>
          {widgets.map((widget) => (
            <Grid item key={widget.type} container justifyContent="center" alignItems="center" xs={6}>
              <Widget type={widget.type} />
            </Grid>
          ))}
        </Grid>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default WidgetGroup;
