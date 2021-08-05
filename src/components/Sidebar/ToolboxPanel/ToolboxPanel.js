import _ from 'lodash';
import WidgetGroup from './WidgetGroup';
import { WIDGET_TYPES as WIDGETS } from 'components/WidgetEditor/constants';
import { ExpandMore } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import useStyles from '../use-styles';
import { GroupAccordion, GroupAccordionSummary, GroupAccordionDetails } from '../styled-components';

const ToolboxPanel = () => {
  const groupedWidgets = _.groupBy(WIDGETS, 'group');
  const classes = useStyles();

  return (
    <GroupAccordion>
      <GroupAccordionSummary expandIcon={<ExpandMore className={classes.expand} />}>
        <Typography className={classes.group}>Toolbox</Typography>
      </GroupAccordionSummary>
      <GroupAccordionDetails>
        {Object.keys(groupedWidgets).map((group) => (
          <WidgetGroup key={group} group={group} widgets={groupedWidgets[group]} />
        ))}
      </GroupAccordionDetails>
    </GroupAccordion>
  );
};

export default ToolboxPanel;
