import { useRef } from 'react';
import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';
import { WIDGET_IMG_BASE_URL } from 'pages/Dashboard/constants';

const useStyles = makeStyles({
  image: {
    zIndex: (props) => props.depth,
    width: 97,
    height: 124,
  },
});

const FigureWidget = ({ id, type, depth, transform, landedPos, mousePos, onTransform, onTransformStart, onTransformEnd, onContextMenu }) => {
  const classes = useStyles({ depth });
  const imgRef = useRef();

  return (
    <BaseWidget
      id={id}
      depth={depth}
      type={type}
      draggable={true}
      resizable={true}
      rotatable={false}
      target={imgRef}
      mousePos={mousePos}
      transform={transform || landedPos}
      onTransform={onTransform}
      onTransformStart={onTransformStart}
      onTransformEnd={onTransformEnd}
      onContextMenu={onContextMenu}
    >
      <img ref={imgRef} className={classes.image} src={`${WIDGET_IMG_BASE_URL}${type}.png`} alt={type} draggable={false} />
    </BaseWidget>
  );
};

export default FigureWidget;
