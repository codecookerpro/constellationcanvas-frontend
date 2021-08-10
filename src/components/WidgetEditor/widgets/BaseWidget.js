import React, { memo, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Moveable from 'react-moveable';
import { makeStyles } from '@material-ui/core';
import { TRANS_TYPES, WIDGET_SCALE_LIMIT } from '../constants';
import { parseTransform, transformToString } from '../helper';
import { toArray } from 'utils';

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

const BaseWidget = (props) => {
  const { id, depth, children, target, transform, hovered, onTransform, onTransformStart, onTransformEnd } = props;
  const containerRef = useRef();
  const classes = useStyles({ depth, hovered });

  useEffect(
    () =>
      toArray(target).forEach((tar) => {
        tar.current.style.transform = transformToString(transform);
      }),
    [target, transform]
  );

  const handleDrag = ({ target, transform }) => {
    target.style.transform = transform;
    onTransform({ id, type: TRANS_TYPES.drag, transform: parseTransform(transform) });
  };

  const handleRotate = ({ target, transform }) => {
    target.style.transform = transform;
    onTransform({ id, type: TRANS_TYPES.rotate, transform: parseTransform(transform) });
  };

  const handleScale = ({ target, transform, scale: [sx, sy] }) => {
    const { xMin, yMin, xMax, yMax } = WIDGET_SCALE_LIMIT;
    if (sx < xMin || sy < yMin || sx > xMax || sy > yMax) {
      return;
    }

    target.style.transform = transform;
    onTransform({ id, type: TRANS_TYPES.scale, transform: parseTransform(transform) });
  };

  const handleDragGroup = ({ events }) => {
    events.forEach((ev) => handleDrag(ev));
  };

  const handleRotateGroup = ({ events }) => {
    events.forEach((ev) => handleRotate(ev));
  };

  const handleScaleGroup = ({ events }) => {
    events.forEach((ev) => handleScale(ev));
  };

  const handleTransformStart = (e) => {
    onTransformStart(id);
  };

  const handleTransformEnd = () => {
    onTransformEnd(id);
  };

  return (
    <div ref={containerRef} className={clsx(classes.root, 'widget-container')} id={`widget-${id}`}>
      {children}
      <Moveable
        draggable={true}
        rotatable={false}
        scalable={true}
        {...props}
        defaultGroupRotate={0}
        defaultGroupOrigin={'50% 50%'}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        origin={false}
        throttleRotate={0}
        rotationPosition={'top'}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        throttleResize={0}
        renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
        edge={false}
        onDragGroup={handleDragGroup}
        onRotateGroup={handleRotateGroup}
        onScaleGroup={handleScaleGroup}
        onDrag={handleDrag}
        onDragStart={handleTransformStart}
        onDragEnd={handleTransformEnd}
        onRotate={handleRotate}
        onRotateStart={handleTransformStart}
        onRotateEnd={handleTransformEnd}
        onScale={handleScale}
        onScaleStart={handleTransformStart}
        onScaleEnd={handleTransformEnd}
      />
    </div>
  );
};

export default memo(BaseWidget);
