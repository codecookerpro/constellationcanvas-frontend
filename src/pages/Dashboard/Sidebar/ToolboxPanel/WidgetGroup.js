import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Widget from './Widget';
import { StyledAccordion, StyledAccordionSummary, StyledAccordionDetails } from './styled-components';
import useStyles from '../use-styles';

const WidgetGroup = ({ type, label, count, imageType }) => {
  const classes = useStyles();

  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.subGroup}>{label}</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Grid container spacing={3}>
          {Array.from({ length: count }).map((v, idx) => (
            <Grid item key={`${type}${idx}`} container justifyContent="center" alignItems="center" xs={6}>
              <Widget group={type} type={`${type}${idx + 1}`} imageType={imageType} />
            </Grid>
          ))}
        </Grid>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default WidgetGroup;
