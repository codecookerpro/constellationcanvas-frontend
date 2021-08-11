import WidgetGroup from './WidgetGroup';
import { WIDGET_GROUPS } from 'components/WidgetEditor/constants';
import { ExpandMore } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import useStyles from '../use-styles';
import { GroupAccordion, GroupAccordionSummary, GroupAccordionDetails } from '../styled-components';

const ToolboxPanel = () => {
  const classes = useStyles();

  return (
    <GroupAccordion>
      <GroupAccordionSummary expandIcon={<ExpandMore className={classes.expand} />}>
        <Typography className={classes.group}>Toolbox</Typography>
      </GroupAccordionSummary>
      <GroupAccordionDetails>
        {WIDGET_GROUPS.map(({ type, label, count, imageType }) => (
          <WidgetGroup key={type} type={type} imageType={imageType} label={label} count={count} />
        ))}
      </GroupAccordionDetails>
    </GroupAccordion>
  );
};

export default ToolboxPanel;
