import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';
import { WIDGET_IMG_BASE_URL } from 'pages/Dashboard/constants';
import { useRef } from 'react';

const useStyles = makeStyles({
  image: {
    width: 97,
    height: 124,
    backgroundImage: (props) => `url(${WIDGET_IMG_BASE_URL}${props.type}.png)`,
    backgroundSize: '100% 100%',
  },
  text: {
    position: 'absolute',
    top: (props) => `${props.newPos.y + 62}px`,
    left: (props) => `${props.newPos.x + 49}px`,
    transform: 'translate(0, -10px)',
    background: 'transparent',
    zIndex: (props) => `${props.depth + 1}`,
    border: 0,
    outline: 'none',
  },
});

const TextWidget = ({ id, type, depth, transform, landedPos, hovered, onTransform, onTransformStart, onTransformEnd, onContextMenu }) => {
  const newPos = transform || landedPos;
  const classes = useStyles({ type, newPos, depth });
  const imgRef = useRef();

  return (
    <>
      <input type="text" className={classes.text} autoFocus id={`text-widget-${id}`}></input>
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
        onContextMenu={onContextMenu}
      >
        <div ref={imgRef} className={classes.image} />
      </BaseWidget>
    </>
  );
};

export default TextWidget;
