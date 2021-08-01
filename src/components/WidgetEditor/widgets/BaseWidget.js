import React, { useEffect, useRef } from 'react';
import Moveable from 'react-moveable';
import { makeStyles } from '@material-ui/core';
import { TRANS_TYPES } from '../constants';
import { parseTransform, transformToString } from '../helper';

const useStyles = makeStyles({
  root: {
    display: 'none',
    padding: 30,
  },
});

export default function BaseWidget({ children, targets = [], draggable = true, rotatable = true, resizable = true, transforms, onTransform }) {
  const classes = useStyles();
  const containerRef = useRef();

  useEffect(() => {
    if (targets) {
      targets.forEach((target) => {
        const [, , , width, height] = transforms[target.current.id];
        target.current.style.transform = transformToString(transforms[target.current.id]);
        target.current.style.width = `${width}px`;
        target.current.style.height = `${height}px`;
      });
      containerRef.current.style.display = 'block';
    }
    // eslint-disable-next-line
  }, []);

  const handleDragGroup = ({ events }) => {
    events.forEach((ev) => {
      ev.target.style.transform = ev.transform;
      onTransform(ev.target.id, TRANS_TYPES.drag, parseTransform(ev.transform));
    });
  };

  const handleRotateGroup = ({ events }) => {
    events.forEach((ev) => {
      ev.target.style.transform = ev.drag.transform;
      onTransform(ev.target.id, TRANS_TYPES.rotate, parseTransform(ev.drag.transform));
    });
  };

  const handleResizeGroup = ({ events }) => {
    events.forEach((ev) => {
      ev.target.style.width = `${ev.width}px`;
      ev.target.style.height = `${ev.height}px`;
      ev.target.style.transform = ev.drag.transform;
      onTransform(ev.target.id, TRANS_TYPES.resize, [...parseTransform(ev.drag.transform), ev.width, ev.height]);
    });
  };

  return (
    <div ref={containerRef} className={classes.root}>
      {children}
      <Moveable
        target={targets}
        defaultGroupRotate={0}
        defaultGroupOrigin={'50% 50%'}
        draggable={draggable}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={1}
        origin={true}
        originDraggable={true}
        originRelative={true}
        rotatable={rotatable}
        throttleRotate={0}
        rotationPosition={'top'}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        resizable={resizable}
        keepRatio={false}
        throttleResize={0}
        renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
        edge={false}
        onDragGroup={handleDragGroup}
        onRotateGroup={handleRotateGroup}
        onResizeGroup={handleResizeGroup}
      />
    </div>
  );
}
