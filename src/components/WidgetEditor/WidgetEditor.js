import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import {
  DROP_EFFECT,
  WIDGET_MAP,
  WIDGET_TYPES,
  CONTEXTMENU_ITEMS_GENERAL as general_contexts,
  CONTEXTMENU_ITEMS_WIDGET as widget_contexts,
  CONTEXTMENU_TYPES,
} from './constants';
import { getUniqueId, bringToFront, sendToBack, bringForward, sendBackward, getHoveredWidgets, getMaxDepth } from './helper';
import usePanZoom from 'use-pan-and-zoom';
import Selecto from 'react-selecto';
import WidgetGroup from './WidgetGroup';

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
  const [copiedWidget, setCopiedWidget] = useState({
    id: null,
  });
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState([]);

  const stageRef = useRef();
  const rootRef = useRef();
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
      depth: getMaxDepth(widgets) + 1,
      data: {},
      landedPos: { x, y },
    };
    setWidgets((widgets) => widgets.concat(newWidget));
  };

  const handleTransform = ({ id, transform }) => {
    setWidgets(widgets.map((w) => (w.id === id ? { ...w, transform: { ...w.transform, ...transform } } : w)));
  };

  const handleDataChange = (id, data) => {
    setWidgets(widgets.map((w) => (w.id === id ? { ...w, data: { ...w.data, ...data } } : w)));
  };

  const handleTransformStart = (id) => {
    setTransforming(id);
  };

  const handleTransformEnd = (id) => {
    setTransforming(null);
  };

  const handleContextClick = (e, type) => {
    e.preventDefault();

    if (type === CONTEXTMENU_TYPES.front) {
      setWidgets(bringToFront(widgets, contextState.id));
    } else if (type === CONTEXTMENU_TYPES.back) {
      setWidgets(sendToBack(widgets, contextState.id));
    } else if (type === CONTEXTMENU_TYPES.forward) {
      setWidgets(bringForward(widgets, contextState.id, stageRef));
    } else if (type === CONTEXTMENU_TYPES.backward) {
      setWidgets(sendBackward(widgets, contextState.id, stageRef));
    } else if (type === CONTEXTMENU_TYPES.copy) {
      setCopiedWidget(widgets.find((w) => w.id === contextState.id));
    } else if (type === CONTEXTMENU_TYPES.cut) {
      setCopiedWidget(widgets.find((w) => w.id === contextState.id));
      setWidgets(widgets.filter((w) => w.id !== contextState.id));
    } else if (type === CONTEXTMENU_TYPES.paste) {
      if (copiedWidget.id !== null) {
        const { x: baseX, y: baseY } = stageRef.current.getBoundingClientRect();
        const newWidget = {
          ...copiedWidget,
          id: getUniqueId(),
          depth: getMaxDepth(widgets) + 1,
          transform: {
            ...copiedWidget.transform,
            x: contextState.mouseX - baseX,
            y: contextState.mouseY - baseY,
          },
        };
        setWidgets((widgets) => widgets.concat(newWidget));
      }
    } else if (type === CONTEXTMENU_TYPES.delete) {
      setWidgets(widgets.filter((w) => w.id !== contextState.id));
    }

    setContextState({
      id: null,
      mouseX: null,
      mouseY: null,
    });
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 0 && e.ctrlKey === false) {
      const hoveredWidgets = getHoveredWidgets(widgets, stageRef, e);
      const frontWidget = hoveredWidgets.sort((a, b) => b.depth - a.depth)?.[0];
      setWidgets(widgets.map((w) => ({ ...w, hovered: w.id === frontWidget?.id })));
    } else if (transforming === null && e.ctrlKey === false) {
      setContextState({
        id: null,
        mouseX: null,
        mouseY: null,
      });
      panZoomHandlers.onMouseMove(e);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => setCtrlPressed(e.key === 'Control' ? true : ctrlPressed));
    window.addEventListener('keyup', (e) => setCtrlPressed(e.key === 'Control' ? false : ctrlPressed));
    // eslint-disable-next-line
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();

    const hoveredWidgets = getHoveredWidgets(widgets, stageRef, e);
    const frontWidget = hoveredWidgets.sort((a, b) => b.depth - a.depth)?.[0];
    if (frontWidget === undefined) {
      setContextState({
        id: null,
        mouseX: e.clientX,
        mouseY: e.clientY,
      });
    } else {
      setContextState({
        id: frontWidget.id,
        mouseX: e.clientX,
        mouseY: e.clientY,
      });
    }
  };

  return (
    <div className={classes.root} ref={rootRef} id="widget-editor-wrapper">
      <div
        {...panZoomHandlers}
        className={classes.widgetZoompane}
        ref={(el) => setContainer(el)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onContextMenu={handleContextMenu}
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
                onDataChange={handleDataChange}
                onTransformStart={handleTransformStart}
                onTransformEnd={handleTransformEnd}
              />
            );
          })}
          <Menu
            style={{ zIndex: 99999 }}
            keepMounted
            open={contextState.mouseY !== null}
            onClose={handleContextClick}
            anchorReference="anchorPosition"
            anchorPosition={
              contextState.mouseY !== null && contextState.mouseX !== null ? { top: contextState.mouseY, left: contextState.mouseX } : undefined
            }
            transitionDuration={0}
          >
            {(contextState.id === null ? general_contexts : widget_contexts).map((context, index) => {
              if (context.type === CONTEXTMENU_TYPES.divider) {
                return <Divider key={context.type + index} />;
              }
              if (context.type === CONTEXTMENU_TYPES.paste) {
                return (
                  <MenuItem key={context.type} onClick={(e) => handleContextClick(e, context.type)} disabled={copiedWidget.id === null}>
                    {context.label}
                  </MenuItem>
                );
              }
              return (
                <MenuItem key={context.type} onClick={(e) => handleContextClick(e, context.type)}>
                  {context.label}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      </div>
      {ctrlPressed && !transforming && (
        <Selecto
          selectableTargets={['.widget']}
          onSelect={(e) => {
            setSelectedWidgets([]);
            e.added.forEach((el) => {
              el.classList.add('selected');
            });
            e.removed.forEach((el) => {
              el.classList.remove('selected');
            });
          }}
        />
      )}
      <WidgetGroup targets={selectedWidgets} />
    </div>
  );
};

export default WidgetEditor;
