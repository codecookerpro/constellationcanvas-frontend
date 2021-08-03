import React, { useEffect, useRef } from 'react';
import Moveable from 'react-moveable';
import { makeStyles } from '@material-ui/core';
import { TRANS_TYPES } from '../constants';
import { parseTransform, transformToString } from '../helper';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    zIndex: (props) => props.depth,
    '& .moveable-line, & .moveable-control': {
      visibility: (props) => (props.hovered ? 'visible' : 'hidden'),
    },
    '& *': {
      userSelect: 'none',
    },
  },
});

export default function BaseWidget({
  id,
  depth,
  children,
  target,
  draggable = true,
  rotatable = true,
  resizable = true,
  keepRatio = true,
  transform,
  hovered,
  onTransform,
  onTransformStart,
  onTransformEnd,
  onContextMenu,
}) {
  const containerRef = useRef();
  const classes = useStyles({ depth, hovered });

  useEffect(() => {
    const { w: width, h: height } = transform;
    target.current.style.transform = transformToString(transform);

    if (width && height) {
      target.current.style.width = `${width}px`;
      target.current.style.height = `${height}px`;
    }
  }, [target, transform]);

  const handleDrag = (ev) => {
    ev.target.style.transform = ev.transform;
    onTransform({ id, type: TRANS_TYPES.drag, transform: parseTransform(ev.transform) });
  };

  const handleRotate = (ev) => {
    ev.target.style.transform = ev.drag.transform;
    onTransform({ id, type: TRANS_TYPES.rotate, transform: parseTransform(ev.drag.transform) });
  };

  const handleResize = (ev) => {
    const { width, height, drag, target } = ev;
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;
    target.style.transform = drag.transform;
    onTransform({ id, type: TRANS_TYPES.resize, transform: { ...parseTransform(drag.transform), w: width, h: height } });
  };

  const handleDragGroup = ({ events }) => {
    events.forEach((ev) => handleDrag(ev));
  };

  const handleRotateGroup = ({ events }) => {
    events.forEach((ev) => handleRotate(ev));
  };

  const handleResizeGroup = ({ events }) => {
    events.forEach((ev) => handleResize(ev));
  };

  const handleTransformStart = () => {
    onTransformStart(id);
  };

  const handleTransformEnd = () => {
    onTransformEnd(id);
  };

  return (
    <div ref={containerRef} className={classes.root} onContextMenu={(e) => onContextMenu(e, id)} id={`widget-${id}`}>
      {children}
      <Moveable
        target={target}
        defaultGroupRotate={0}
        defaultGroupOrigin={'50% 50%'}
        draggable={draggable}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={1}
        origin={rotatable}
        originDraggable={rotatable}
        originRelative={rotatable}
        rotatable={rotatable}
        throttleRotate={0}
        rotationPosition={'top'}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        resizable={resizable}
        keepRatio={keepRatio}
        throttleResize={0}
        renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
        edge={false}
        onDragGroup={handleDragGroup}
        onRotateGroup={handleRotateGroup}
        onResizeGroup={handleResizeGroup}
        onDrag={handleDrag}
        onRotate={handleRotate}
        onResize={handleResize}
        onDragStart={handleTransformStart}
        onRotateStart={handleTransformStart}
        onResizeStart={handleTransformStart}
        onDragEnd={handleTransformEnd}
        onRotateEnd={handleTransformEnd}
        onResizeEnd={handleTransformEnd}
      />
    </div>
  );
}
