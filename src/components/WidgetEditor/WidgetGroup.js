import React from 'react';
import Moveable from 'react-moveable';

export default function WidgetGroup({ targets, onTransform }) {
  const handleDrag = (ev) => {
    ev.target.style.transform = ev.transform;
    // onTransform({ id, type: TRANS_TYPES.drag, transform: parseTransform(ev.transform) });
  };

  const handleRotate = (ev) => {
    ev.target.style.transform = ev.drag.transform;
    // onTransform({ id, type: TRANS_TYPES.rotate, transform: parseTransform(ev.drag.transform) });
  };

  const handleResize = (ev) => {
    const { width, height, drag, target } = ev;
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;
    target.style.transform = drag.transform;
    // onTransform({ id, type: TRANS_TYPES.resize, transform: { ...parseTransform(drag.transform), w: width, h: height } });
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

  const handleTransformStart = (e) => {
    e.target.focus();
    // onTransformStart(id);
  };

  const handleTransformEnd = () => {
    // onTransformEnd(id);
  };

  return (
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
  );
}
