import { CANVASES } from './constants';
import { GroupAccordion, GroupAccordionSummary, GroupAccordionDetails } from '../styled-components';
import { Typography } from '@material-ui/core';
import { ExpandMore, ArrowForwardIos } from '@material-ui/icons';
import useStyles from '../use-styles';

const MyCanvasPanel = () => {
  const classes = useStyles();

  return (
    <GroupAccordion>
      <GroupAccordionSummary expandIcon={<ExpandMore className={classes.expand} />}>
        <Typography className={classes.group}>My Canvas</Typography>
      </GroupAccordionSummary>
      <GroupAccordionDetails>
        <div className={classes.detail}>
          {CANVASES.map((c) => {
            return (
              <div className={classes.detailItem} key={c.title}>
                <Typography className={classes.text}>{c.title}</Typography>
                <ArrowForwardIos fontSize="small" />
              </div>
            );
          })}
        </div>
      </GroupAccordionDetails>
    </GroupAccordion>
  );
};

export default MyCanvasPanel;
