import React, { memo, useEffect, useRef } from 'react';
import Moveable from 'react-moveable';
import { makeStyles } from '@material-ui/core';
import { WIDGET_SCALE_LIMIT } from '../constants';
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

const BaseWidget = React.forwardRef((props, ref) => {
  const { uuid, depth, children, target, transform, hovered, zoom, onTransformStart, onTransformEnd } = props;
  const containerRef = useRef();
  const classes = useStyles({ depth, hovered });

  useEffect(() => {
    toArray(target).forEach((tar) => {
      tar.current.style.transform = transformToString(transform);
    });
    ref.current.updateRect();
  }, [target, transform, ref]);

  const handleDrag = ({ target, transform, translate: [tx, ty], dist: [dx, dy] }) => {
    tx = tx - dx + dx / zoom;
    ty = ty - dy + dy / zoom;
    target.style.transform = transformToString({ ...parseTransform(transform), tx, ty });
  };

  const handleRotate = ({ target, transform }) => {
    target.style.transform = transform;
  };

  const handleScale = ({ target, transform, scale: [sx, sy] }) => {
    const { xMin, yMin, xMax, yMax } = WIDGET_SCALE_LIMIT;
    if (sx < xMin || sy < yMin || sx > xMax || sy > yMax) {
      return;
    }

    target.style.transform = transform;
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
    onTransformStart(uuid);
  };

  const handleTransformEnd = (e) => {
    onTransformEnd(uuid, { transform: parseTransform(e.target.style.transform) });
  };

  return (
    <div ref={containerRef} className={classes.root} id={`widget-container-${uuid}`}>
      {children}
      <Moveable
        draggable={true}
        rotatable={false}
        scalable={true}
        ref={ref}
        {...props}
        zoom={1 / zoom}
        defaultGroupRotate={0}
        defaultGroupOrigin={'50% 50%'}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        origin={false}
        throttleRotate={0}
        rotationPosition={'top'}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
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
});

export default memo(BaseWidget);
