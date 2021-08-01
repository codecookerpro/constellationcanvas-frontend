import React, { useEffect, useState, useRef, useMemo } from 'react';
import Moveable from 'react-moveable';
import { makeStyles } from '@material-ui/core';
import { TRANS_TYPES } from '../constants';
import { parseTransform, transformToString } from '../helper';

const useStyles = makeStyles({
  root: {
    display: 'none',
    position: 'absolute',
    zIndex: (props) => props.depth,
  },
});

export default function BaseWidget({
  id,
  depth,
  children,
  targets = [],
  draggable = true,
  rotatable = true,
  resizable = true,
  keepRatio = true,
  transforms,
  mousePos,
  onTransform,
  onContextMenu,
}) {
  const classes = useStyles({ depth });
  const containerRef = useRef();
  const [boundRect, setBoundRect] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  const calcBoundRect = (rects) => {
    const boundRect = { left: Infinity, top: Infinity, right: 0, bottom: 0 };
    const baseRect = document.querySelector('#widget-editor').getBoundingClientRect();

    for (const rect of rects) {
      boundRect.left = rect.left < boundRect.left ? rect.left : boundRect.left;
      boundRect.top = rect.top < boundRect.top ? rect.top : boundRect.top;
      boundRect.right = rect.right > boundRect.right ? rect.right : boundRect.right;
      boundRect.bottom = rect.bottom > boundRect.bottom ? rect.bottom : boundRect.bottom;
    }

    const left = boundRect.left - baseRect.left - 30;
    const right = boundRect.right - baseRect.left + 30;
    const top = boundRect.top - baseRect.top - 30;
    const bottom = boundRect.bottom - baseRect.top + 30;

    return { left, right, top, bottom };
  };

  const handleMutation = (mutationList, observer) => {
    const rects = [];
    for (const mutation of mutationList) {
      rects.push(mutation.target.getBoundingClientRect());
    }

    setBoundRect(calcBoundRect(rects));
  };

  // eslint-disable-next-line
  const observer = useMemo(() => new MutationObserver(handleMutation), []);

  useEffect(() => {
    if (targets) {
      targets.forEach((target) => {
        const { width, height } = transforms[target.current.id];
        target.current.style.transform = transformToString(transforms[target.current.id]);

        if (width && height) {
          target.current.style.width = `${width}px`;
          target.current.style.height = `${height}px`;
        }
      });

      setTimeout(() => {
        const controls = containerRef.current.querySelectorAll('.moveable-control, .moveable-rotation');
        const config = { attributes: true, childList: false, subtree: false };
        const rects = [];
        controls.forEach((control) => {
          observer.observe(control, config);
          rects.push(control.getBoundingClientRect());
        });

        setBoundRect(calcBoundRect(rects));
      });

      containerRef.current.style.display = 'block';
    }
    // eslint-disable-next-line
  }, []);

  const handleDrag = (ev) => {
    ev.target.style.transform = ev.transform;
    onTransform({ id, element: ev.target.id, type: TRANS_TYPES.drag, transform: parseTransform(ev.transform) });
  };

  const handleRotate = (ev) => {
    ev.target.style.transform = ev.drag.transform;
    onTransform({ id, element: ev.target.id, type: TRANS_TYPES.rotate, transform: parseTransform(ev.drag.transform) });
  };

  const handleResize = (ev) => {
    const { width, height, drag, target } = ev;
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;
    target.style.transform = drag.transform;
    onTransform({ id, element: target.id, type: TRANS_TYPES.resize, transform: { ...parseTransform(drag.transform), width, height } });
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
        target={targets}
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
      />
    </div>
  );
}
