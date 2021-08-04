import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { DROP_EFFECT, WIDGET_MAP, WIDGET_TYPES, CONTEXTMENU_ITEMS as contexts, ORDER_TYPES } from './constants';
import { getUniqueId, bringToFront, sendToBack, bringForward, sendBackward, getHoveredWidgets } from './helper';
import usePanZoom from 'use-pan-and-zoom';

const initialWidgets = [
  {
    id: '0bd72455dc0d783e324660d2',
    type: 'lego2',
    depth: 0,
    data: {},
    transform: { x: '72.75px', y: '167px', r: '0deg', w: 199, h: 253 },
  },
  {
    id: '0bd72c7cdc0d783e324660d3',
    type: 'lego6',
    depth: 1,
    data: {},
    transform: { x: '292.75px', y: '349.5px', r: '0deg', w: 179, h: 228 },
  },
  {
    id: '0bd730dcdc0d783e324660d4',
    type: 'lego6',
    depth: 2,
    data: {},
    transform: { x: '563.75px', y: '174px', r: '0deg', w: 176, h: 224 },
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  widgetZoompane: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  widgetStage: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});

const WidgetEditor = () => {
  const classes = useStyles();
  const [widgets, setWidgets] = useState(initialWidgets);
  const [transforming, setTransforming] = useState(null);
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
  const { transform, panZoomHandlers, setContainer } = usePanZoom({ enableZoom: false });
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
  };

  const handleTransform = ({ id, transform }) => {
    const textWidget = stageRef.current.querySelector(`#text-widget-${id}`);
    if (textWidget) {
      textWidget.style.left = transform.x;
      textWidget.style.top = transform.y;
      textWidget.style.transform = 'translate(40px, 52px)';
      console.log(textWidget.style);
    }
    setWidgets(widgets.map((w) => (w.id === id ? { ...w, transform } : w)));
  };
  const handleTransformStart = (id) => {
    setTransforming(id);
  };

  const handleTransformEnd = (id) => {
    setTransforming(null);
  };

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
      setWidgets(bringForward(widgets, contextState.id, stageRef));
    } else if (type === ORDER_TYPES.backward) {
      setWidgets(sendBackward(widgets, contextState.id, stageRef));
    }

    setContextState({
      id: null,
      mouseX: null,
      mouseY: null,
    });
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 0) {
      const hoveredWidgets = getHoveredWidgets(widgets, stageRef, e);
      const frontWidget = hoveredWidgets.sort((a, b) => b.depth - a.depth)?.[0];
      setWidgets(widgets.map((w) => ({ ...w, hovered: w.id === frontWidget?.id })));
    } else if (transforming === null) {
      setContextState({
        id: null,
        mouseX: null,
        mouseY: null,
      });
      panZoomHandlers.onMouseMove(e);
    }
  };

  const handleRightClick = (e) => {
    const hoveredWidgets = getHoveredWidgets(widgets, stageRef, e);
    const frontWidget = hoveredWidgets.sort((a, b) => b.depth - a.depth)?.[0];
    if (frontWidget === undefined) {
      setContextState({
        id: null,
        mouseX: null,
        mouseY: null,
      });
    } else {
      e.preventDefault();

      setContextState({
        id: frontWidget.id,
        mouseX: e.clientX,
        mouseY: e.clientY,
      });
    }
  };

  return (
    <div className={classes.root}>
      <div
        className={classes.widgetZoompane}
        ref={(el) => setContainer(el)}
        {...panZoomHandlers}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onContextMenu={handleRightClick}
      >
        <div className={classes.widgetStage} ref={stageRef} style={{ transform }}>
          {widgets.map((widget) => {
            const group = WIDGET_TYPES.find((wtype) => wtype.type === widget.type).group;
            const WidgetComponent = WIDGET_MAP[widget.type] || WIDGET_MAP[group];
            return (
              <WidgetComponent
                {...widget}
                key={widget.id}
                onTransform={handleTransform}
                onTransformStart={handleTransformStart}
                onTransformEnd={handleTransformEnd}
                onContextMenu={handleContextMenu}
              />
            );
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
      </div>
    </div>
  );
};

export default WidgetEditor;
