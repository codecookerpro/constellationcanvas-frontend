import React, { useEffect, useRef } from 'react';
import Moveable from 'react-moveable';
import { makeStyles } from '@material-ui/core';
import { DROP_EFFECT } from '../constants';

const useStyles = makeStyles({
  root: {
    display: (props) => (props.dnd ? 'block' : 'none'),
    padding: 30,
  },
});

export default function BaseEntity({ children, targets = [], dnd, type, transforms, onSelect, onTransform }) {
  const classes = useStyles({ dnd });
  const containerRef = useRef();

  useEffect(() => {
    if (dnd || !targets) {
      return;
    }
    targets.forEach((target) => {
      const { transform, width, height } = transforms[target.current.id];
      target.current.style.transform = transform;
      target.current.style.width = `${width}px`;
      target.current.style.height = `${height}px`;
    });
    containerRef.current.style.display = 'block';
  }, []);

  const onDragStart = (event) => {
    const data = {
      offsetX: event.clientX,
      offsetY: event.clientY,
      type,
    };
    event.dataTransfer.setData('application/constellation-widget', JSON.stringify(data));
    event.dataTransfer.effectAllowed = DROP_EFFECT;
  };

  return (
    <div onDragStart={onDragStart} draggable={dnd} onClick={onSelect} ref={containerRef} className={classes.root}>
      {children}
      {dnd === false && (
        <Moveable
          target={targets}
          defaultGroupRotate={0}
          defaultGroupOrigin={'50% 50%'}
          draggable={true}
          throttleDrag={0}
          startDragRotate={0}
          throttleDragRotate={0}
          zoom={1}
          origin={true}
          originDraggable={true}
          originRelative={true}
          rotatable={true}
          throttleRotate={0}
          rotationPosition={'top'}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
          resizable={true}
          keepRatio={false}
          throttleResize={0}
          renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
          edge={false}
          onDragGroup={({ events }) => {
            events.forEach((ev) => {
              ev.target.style.transform = ev.transform;
              onTransform(ev.target.id, ev.transform);
            });
          }}
          onRotateGroup={({ events }) => {
            events.forEach((ev) => {
              ev.target.style.transform = ev.drag.transform;
            });
          }}
          onResizeGroup={({ events }) => {
            events.forEach((ev) => {
              ev.target.style.width = `${ev.width}px`;
              ev.target.style.height = `${ev.height}px`;
              ev.target.style.transform = ev.drag.transform;
            });
          }}
        />
      )}
    </div>
  );
}
