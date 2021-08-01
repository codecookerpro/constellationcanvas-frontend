import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';

import Group from './Group';

import { APP_BAR_HEIGHT } from '../constants';
import { WIDGET_TYPES as WIDGETS } from 'components/WidgetEditor/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
    overflowX: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 4,
    },
  },
}));

const WidgetPicker = (props) => {
  const classes = useStyles();

  const groupedWidgets = _.groupBy(WIDGETS, 'group');

  return (
    <div className={classes.root}>
      {Object.keys(groupedWidgets).map((group) => (
        <Group key={group} group={group} widgets={groupedWidgets[group]} />
      ))}
    </div>
  );
};

export default WidgetPicker;
