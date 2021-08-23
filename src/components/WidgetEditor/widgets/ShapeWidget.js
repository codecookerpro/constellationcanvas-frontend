import { useRef, useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import { SHAPE_PATHS, WIDGET_GROUPS } from '../constants';
import BaseWidget from './BaseWidget';
import useDynamicSize from '../hooks/use-dynamic-size';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    width: (props) => props.width || 0,
    height: (props) => props.height || 0,
  },
});

const FigureWidget = (props) => {
  const { type, group } = props;
  const figureRef = useRef();
  const moveableRef = useRef();
  const { draggable, scalable, rotatable, keepRatio } = useMemo(() => WIDGET_GROUPS.find((g) => g.type === group), [group]);
  const { width, height } = useDynamicSize(group, type, moveableRef);
  const classes = useStyles({ type, group, width, height });

  return (
    <BaseWidget {...props} draggable={draggable} scalable={scalable} rotatable={rotatable} keepRatio={keepRatio} target={figureRef} ref={moveableRef}>
      <div ref={figureRef} className={clsx(classes.root, 'widget')} id={props.uuid}>
        <svg width="100%" height="100%" viewBox="0 0 52 52">
          <g fill="blue" stroke="red" transform="translate(1, 1)">
            {SHAPE_PATHS[type]}
          </g>
        </svg>
      </div>
    </BaseWidget>
  );
};

export default FigureWidget;
