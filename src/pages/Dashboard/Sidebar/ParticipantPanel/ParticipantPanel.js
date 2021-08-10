import { GroupAccordion, GroupAccordionSummary, GroupAccordionDetails } from '../styled-components';
import { Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import useStyles from '../use-styles';

const ParticipantPanel = () => {
  const classes = useStyles();

  return (
    <GroupAccordion>
      <GroupAccordionSummary expandIcon={<ExpandMore className={classes.expand} />}>
        <Typography className={classes.group}>Participants</Typography>
      </GroupAccordionSummary>
      <GroupAccordionDetails></GroupAccordionDetails>
    </GroupAccordion>
  );
};

export default ParticipantPanel;
