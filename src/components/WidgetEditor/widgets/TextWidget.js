import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';
import { WIDGET_IMG_BASE_URL } from 'constants/user-interface';
import { useRef } from 'react';
import { TEXT_HEIGHT, TEXT_WIDTH, TEXT_WIDGET_PADDINGS } from '../constants';

const useStyles = makeStyles({
  root: {
    width: (props) => props.w,
    height: (props) => props.h,
    backgroundImage: (props) => `url(${WIDGET_IMG_BASE_URL}${props.type}.png)`,
    backgroundSize: '100% 100%',
    border: 0,
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    padding: ({ w, h, padding: [pt, pr, pb, pl] }) => {
      return `${h * pt}px ${w * pr}px ${h * pb}px ${w * pl}px`;
    },
    fontSize: 18,
  },
});

const TextWidget = ({ id, type, depth, transform, landedPos, hovered, onTransform, onTransformStart, onTransformEnd }) => {
  const newPos = transform || landedPos;
  const classes = useStyles({
    type,
    newPos,
    depth,
    padding: TEXT_WIDGET_PADDINGS[type],
    w: transform?.w || TEXT_WIDTH,
    h: transform?.h || TEXT_HEIGHT,
  });
  const imgRef = useRef();

  return (
    <>
      <BaseWidget
        id={id}
        depth={depth}
        type={type}
        draggable={true}
        resizable={true}
        rotatable={false}
        keepRatio={false}
        target={imgRef}
        hovered={hovered}
        transform={newPos}
        onTransform={onTransform}
        onTransformStart={onTransformStart}
        onTransformEnd={onTransformEnd}
      >
        <textarea ref={imgRef} className={classes.root} autoFocus id={`text-widget-${id}`} />
      </BaseWidget>
    </>
  );
};

export default TextWidget;
