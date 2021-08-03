import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';
import { WIDGET_IMG_BASE_URL } from 'pages/Dashboard/constants';
import { useRef } from 'react';

const useStyles = makeStyles({
  image: {
    width: 60,
    height: 60,
    backgroundImage: (props) => `url(${WIDGET_IMG_BASE_URL}${props.type}.png)`,
    backgroundSize: '100% 100%',
  },
});

const ShapeWidget = ({ id, type, depth, transform, landedPos, mousePos, onTransform, onTransformStart, onTransformEnd, onContextMenu }) => {
  const classes = useStyles({ type });
  const imgRef = useRef();

  return (
    <BaseWidget
      id={id}
      depth={depth}
      type={type}
      draggable={true}
      resizable={true}
      rotatable={false}
      keepRatio={false}
      target={imgRef}
      mousePos={mousePos}
      transform={transform || landedPos}
      onTransform={onTransform}
      onTransformStart={onTransformStart}
      onTransformEnd={onTransformEnd}
      onContextMenu={onContextMenu}
    >
      <div ref={imgRef} className={classes.image} />
    </BaseWidget>
  );
};

export default ShapeWidget;
