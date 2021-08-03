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
    top: '50%',
    left: '50%',
    transform: 'translate(0, -50%)',
    background: 'transparent',
    border: 0,
  },
});

const TextWidget = ({ id, type, depth, transform, landedPos, hovered, onTransform, onTransformStart, onTransformEnd, onContextMenu }) => {
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
      onContextMenu={onContextMenu}
    >
      <div ref={imgRef} className={classes.image}>
        <input type="text" className={classes.text}></input>
      </div>
    </BaseWidget>
  );
};

export default TextWidget;
