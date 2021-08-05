import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';
import { WIDGET_IMG_BASE_URL } from 'constants/user-interface';
import { useRef } from 'react';

const useStyles = makeStyles({
  image: {
    width: 97,
    height: 124,
    backgroundImage: (props) => `url(${WIDGET_IMG_BASE_URL}${props.type}.png)`,
    backgroundSize: '100% 100%',
  },
});

const ShapeWidget = ({ id, type, depth, transform, landedPos, hovered, onTransform, onTransformStart, onTransformEnd }) => {
  const classes = useStyles({ type });
  const imgRef = useRef();

  return (
    <BaseWidget
      id={id}
      depth={depth}
      type={type}
      draggable={true}
      resizable={true}
      rotatable={true}
      keepRatio={false}
      target={imgRef}
      hovered={hovered}
      transform={transform || landedPos}
      onTransform={onTransform}
      onTransformStart={onTransformStart}
      onTransformEnd={onTransformEnd}
    >
      <div ref={imgRef} className={classes.image} />
    </BaseWidget>
  );
};

export default ShapeWidget;
