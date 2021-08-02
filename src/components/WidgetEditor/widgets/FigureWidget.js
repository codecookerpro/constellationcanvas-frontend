import { useRef } from 'react';
import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  image: {
    zIndex: (props) => props.depth,
    width: 97,
    height: 124,
  },
});

const FigureWidget = ({ id, type, depth, transform, landedPos, mousePos, onTransform, onContextMenu }) => {
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
      onContextMenu={onContextMenu}
    >
      <img ref={imgRef} className={classes.image} src={`/assets/img/widgets/${type}.png`} alt={type} draggable={false} />
    </BaseWidget>
  );
};

export default FigureWidget;
