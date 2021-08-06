import { useRef } from 'react';
import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';
import { WIDGET_IMG_BASE_URL } from 'constants/user-interface';
import clsx from 'clsx';

const useStyles = makeStyles({
  image: {
    zIndex: (props) => props.depth,
    width: 97,
    height: 124,
  },
});

const FigureWidget = ({ id, type, depth, transform, landedPos, hovered, onTransform, onTransformStart, onTransformEnd }) => {
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
      hovered={hovered}
      transform={transform || landedPos}
      onTransform={onTransform}
      onTransformStart={onTransformStart}
      onTransformEnd={onTransformEnd}
    >
      <img
        ref={imgRef}
        className={clsx(classes.image, 'widget', `widget-${type}`)}
        src={`${WIDGET_IMG_BASE_URL}${type}.png`}
        alt={type}
        draggable={false}
      />
    </BaseWidget>
  );
};

export default FigureWidget;
