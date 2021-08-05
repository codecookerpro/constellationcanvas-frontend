import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';
import { WIDGET_IMG_BASE_URL } from 'constants/user-interface';
import { useRef } from 'react';

const useStyles = makeStyles({
  image: {
    width: 90,
    height: 40,
    maxHeight: 40,
    background: (props) => `url(${WIDGET_IMG_BASE_URL}${props.type}.png) 0 -40px repeat-x`,
  },
});

const RelationshipWidget = ({ id, type, depth, transform, landedPos, hovered, onTransform, onTransformStart, onTransformEnd }) => {
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

export default RelationshipWidget;
