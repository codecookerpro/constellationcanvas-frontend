import React, { useEffect, useState, useRef, useMemo } from 'react';
import Moveable from 'react-moveable';
import { makeStyles } from '@material-ui/core';
import { TRANS_TYPES } from '../constants';
import { parseTransform, transformToString } from '../helper';
import pointInPolygon from 'point-in-polygon';

const useStyles = makeStyles({
  root: {
    display: 'none',
    position: 'absolute',
    zIndex: (props) => props.depth,
    '& .moveable-line': {
      visibility: (props) => (props.hovered ? 'visible' : 'hidden'),
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
  mousePos,
  onTransform,
  onContextMenu,
}) {
  const containerRef = useRef();
  const [points, setPoints] = useState([]);
  const [transforming, setTransforming] = useState(false);

  const updatePoints = () => {
    const controls = [
      rotatable && containerRef.current.querySelector('.moveable-rotation-control'),
      containerRef.current.querySelector('.moveable-ne'),
      containerRef.current.querySelector('.moveable-se'),
      containerRef.current.querySelector('.moveable-sw'),
      containerRef.current.querySelector('.moveable-nw'),
    ].filter((d) => d);

    const points = [];
    let cx = 0,
      cy = 0;
    controls.forEach((control) => {
      const { x, y } = control.getBoundingClientRect();
      cx += x;
      cy += y;
      points.push([x, y]);
    });

    cx /= points.length;
    cy /= points.length;

    const expended = points.map(([x, y]) => {
      let dx = x - cx;
      let dy = y - cy;
      const norm = Math.sqrt(dx * dx + dy * dy);
      dx /= norm;
      dy /= norm;

      return [x + dx * 30, y + dy * 30];
    });

    setPoints(expended);
  };

  const hovered = useMemo(() => {
    return transforming || (points.length ? pointInPolygon(mousePos, points) : true);
  }, [points, mousePos, transforming]);

  const classes = useStyles({ depth, hovered });

  // eslint-disable-next-line
  const observer = useMemo(() => new MutationObserver(updatePoints), []);

  useEffect(() => {
    if (target) {
      const { width, height } = transform;
      target.current.style.transform = transformToString(transform);

      if (width && height) {
        target.current.style.width = `${width}px`;
        target.current.style.height = `${height}px`;
      }

      const config = { attributes: true, childList: false, subtree: false };
      observer.observe(target.current, config);

      containerRef.current.style.display = 'block';

      setTimeout(updatePoints);
    }
    // eslint-disable-next-line
  }, []);

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
    onTransform({ id, type: TRANS_TYPES.resize, transform: { ...parseTransform(drag.transform), width, height } });
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

  return (
    <div ref={containerRef} className={classes.root} onContextMenu={(e) => onContextMenu(e, id)}>
      {children}
      <Moveable
        target={target}
        defaultGroupRotate={0}
        defaultGroupOrigin={'50% 50%'}
        draggable={hovered && draggable}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={1}
        origin={hovered && rotatable}
        originDraggable={hovered && rotatable}
        originRelative={hovered && rotatable}
        rotatable={hovered && rotatable}
        throttleRotate={0}
        rotationPosition={'top'}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        resizable={hovered && resizable}
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
        onDragStart={() => setTransforming(true)}
        onRotateStart={() => setTransforming(true)}
        onResizeStart={() => setTransforming(true)}
        onDragEnd={() => setTransforming(false)}
        onRotateEnd={() => setTransforming(false)}
        onResizeEnd={() => setTransforming(false)}
      />
    </div>
  );
}
