import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';
import { WIDGET_IMG_BASE_URL } from 'constants/user-interface';
import { useRef } from 'react';
import { WIDGET_GROUPS } from '../constants';

const useStyles = makeStyles({
  root: {
    width: 80,
    height: 15,
    backgroundImage: ({ group, type }) => `url(${WIDGET_IMG_BASE_URL}${group}/${type}.${WIDGET_GROUPS.find((g) => g.type === group).imageType})`,
    backgroundSize: '100% 100%',
  },
});

const RelationshipWidget = (props) => {
  const classes = useStyles(props);
  const figureRef = useRef();

  return (
    <BaseWidget {...props} rotatable={true} keepRatio={false} target={figureRef}>
      <div ref={figureRef} className={classes.root} />
    </BaseWidget>
  );
};

export default RelationshipWidget;
