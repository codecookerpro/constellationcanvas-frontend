import { makeStyles } from '@material-ui/core';
import { WIDGET_IMG_BASE_URL } from 'constants/user-interface';
import { WIDGET_GROUPS } from '../constants';

export default makeStyles({
  root: {
    width: (props) => props.defaultWidth,
    height: (props) => props.defaultHeight,
    backgroundImage: ({ group, type }) => `url(${WIDGET_IMG_BASE_URL}${group}/${type}.${WIDGET_GROUPS.find((g) => g.type === group).imageType})`,
    backgroundSize: '100% 100%',
  },
});
