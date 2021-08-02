import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { DROP_EFFECT, WIDGET_MAP, WIDGET_TYPES, CONTEXTMENU_ITEMS as contexts, ORDER_TYPES } from './constants';
import { getUniqueId, bringToFront, sendToBack, bringForward, sendBackward } from './helper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});

const WidgetEditor = () => {
  const classes = useStyles();
  const [widgets, setWidgets] = useState([]);
  const [mousePos, setMousePos] = useState([Infinity, Infinity]);
  const [transformingWidget, setTransformingWidget] = useState(null);
  const [contextState, setContextState] = useState({
    id: null,
    mouseX: null,
    mouseY: null,
  });
  const stageRef = useRef();
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = DROP_EFFECT;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const { offsetX, offsetY, type } = JSON.parse(event.dataTransfer.getData('application/constellation-widget'));
    const { x: baseX, y: baseY } = stageRef.current.getBoundingClientRect();
    const x = event.clientX - baseX - offsetX;
    const y = event.clientY - baseY - offsetY;
    const newWidget = {
      id: getUniqueId(),
      type,
      depth: widgets.length,
      data: {},
      landedPos: { x, y },
    };
    setWidgets((widgets) => widgets.concat(newWidget));
    setMousePos([event.clientX, event.clientY]);
  };

  const handleTransform = ({ id, type, transform }) => {};

  const handleContextMenu = (e, id) => {
    e.preventDefault();

    setContextState({
      id,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  const handleChangeDepth = (e, type) => {
    e.preventDefault();

    if (type === ORDER_TYPES.front) {
      setWidgets(bringToFront(widgets, contextState.id));
    } else if (type === ORDER_TYPES.back) {
      setWidgets(sendToBack(widgets, contextState.id));
    } else if (type === ORDER_TYPES.forward) {
      setWidgets(bringForward(widgets, contextState.id));
    } else if (type === ORDER_TYPES.backward) {
      setWidgets(sendBackward(widgets, contextState.id));
    }

    setContextState({
      id: null,
      mouseX: null,
      mouseY: null,
    });
  };

  const handleMouseMove = (e) => {
    setMousePos([e.clientX, e.clientY]);
  };

  return (
    <div id="widget-editor" onDrop={handleDrop} onDragOver={handleDragOver} className={classes.root} ref={stageRef} onMouseMove={handleMouseMove}>
      {widgets.map((widget) => {
        const group = WIDGET_TYPES.find((wtype) => wtype.type === widget.type).group;
        const WidgetComponent = WIDGET_MAP[widget.type] || WIDGET_MAP[group];
        return <WidgetComponent {...widget} key={widget.id} onTransform={handleTransform} onContextMenu={handleContextMenu} mousePos={mousePos} />;
      })}
      <Menu
        style={{ zIndex: 99999 }}
        keepMounted
        open={contextState.mouseY !== null}
        onClose={handleChangeDepth}
        anchorReference="anchorPosition"
        anchorPosition={
          contextState.mouseY !== null && contextState.mouseX !== null ? { top: contextState.mouseY, left: contextState.mouseX } : undefined
        }
      >
        {contexts.map((context) => (
          <MenuItem key={context.type} onClick={(e) => handleChangeDepth(e, context.type)}>
            {context.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default WidgetEditor;
