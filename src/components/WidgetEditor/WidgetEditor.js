import React, { useEffect, useMemo, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import {
  WIDGET_MAP,
  CONTEXTMENU_ITEMS_GENERAL,
  CONTEXTMENU_ITEMS_WIDGET,
  CONTEXTMENU_TYPES,
  WIDGET_GROUP_TYPES,
  WIDGET_EDITOR_SCALE_LIMIT,
} from './constants';
import { getHoveredWidgets, getForwardWidget, getBackwardWidget } from './helper';
import usePanZoom from 'use-pan-and-zoom';
import Selecto from 'react-selecto';
import WidgetGroup from './WidgetGroup';

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

const WidgetEditor = ({
  widgets = [],
  addWidget,
  removeWidget,
  setWidgetTransform,
  setWidgetData,
  setWidgetHovered,
  bringToFront,
  sendToBack,
  bringForward,
  sendBackward,
  copiedWidget = { id: null },
  setCopiedWidget,
}) => {
  const classes = useStyles();
  const [transforming, setTransforming] = useState(null);
  const [contextState, setContextState] = useState({
    id: null,
    mouseX: null,
    mouseY: null,
  });
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState([]);

  const stageRef = useRef();
  const rootRef = useRef();

  const blockedPanZoom = useMemo(
    () => transforming || contextState.mouseY || widgets.filter((w) => w.hovered && w.type.match(WIDGET_GROUP_TYPES.text)).length,
    [transforming, contextState, widgets]
  );

  const { transform, zoom, panZoomHandlers, setContainer, setZoom } = usePanZoom({
    minZoom: WIDGET_EDITOR_SCALE_LIMIT.min,
    maxZoom: WIDGET_EDITOR_SCALE_LIMIT.max,
    enableZoom: false,
  });

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const { offsetX, offsetY, type } = JSON.parse(event.dataTransfer.getData('application/constellation-widget'));
    const { x: baseX, y: baseY } = stageRef.current.getBoundingClientRect();
    const tx = (event.clientX - baseX) / zoom - offsetX;
    const ty = (event.clientY - baseY) / zoom - offsetY;
    const newWidget = {
      type,
      data: {},
      transform: { tx, ty, rotate: 0, sx: 1, sy: 1 },
    };
    addWidget(newWidget);
  };

  const handleTransform = ({ id, transform }) => {
    setWidgetTransform({ id, transform });
  };

  const handleDataChange = (id, data) => {
    setWidgetData({ id, data });
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
      bringToFront(contextState.id);
    } else if (type === CONTEXTMENU_TYPES.back) {
      sendToBack(contextState.id);
    } else if (type === CONTEXTMENU_TYPES.forward) {
      const fwidget = getForwardWidget(widgets, contextState.id, stageRef);
      if (fwidget !== undefined) {
        bringForward({
          id: contextState.id,
          forwardId: fwidget.id,
        });
      }
    } else if (type === CONTEXTMENU_TYPES.backward) {
      const bwidget = getBackwardWidget(widgets, contextState.id, stageRef);
      if (bwidget !== undefined) {
        sendBackward({
          id: contextState.id,
          backwardId: bwidget.id,
        });
      }
    } else if (type === CONTEXTMENU_TYPES.copy) {
      setCopiedWidget(widgets.find((w) => w.id === contextState.id));
    } else if (type === CONTEXTMENU_TYPES.cut) {
      setCopiedWidget(widgets.find((w) => w.id === contextState.id));
      removeWidget(contextState.id);
    } else if (type === CONTEXTMENU_TYPES.paste) {
      if (copiedWidget.id !== null) {
        const { x: baseX, y: baseY } = stageRef.current.getBoundingClientRect();
        const newWidget = {
          ...copiedWidget,
          transform: {
            ...copiedWidget.transform,
            tx: contextState.mouseX - baseX,
            ty: contextState.mouseY - baseY,
          },
        };
        addWidget(newWidget);
      }
    } else if (type === CONTEXTMENU_TYPES.delete) {
      removeWidget(contextState.id);
    }

    setContextState({
      id: null,
      mouseX: null,
      mouseY: null,
    });
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 0 && e.ctrlKey === false) {
      const hoveredWidgets = getHoveredWidgets(e, widgets, stageRef);
      const frontWidget = hoveredWidgets.sort((a, b) => b.depth - a.depth)?.[0];

      if (contextState.mouseY === null) {
        setWidgetHovered(frontWidget?.id);
      }
    } else if (!transforming && !e.ctrlKey && !contextState.id && e.buttons === 1) {
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

    const hoveredWidgets = getHoveredWidgets(e, widgets, stageRef);
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

  const handleWheel = (e) => {
    if (!blockedPanZoom) {
      setZoom(zoom - e.deltaY * 0.001);
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
        onWheel={handleWheel}
      >
        <div className={classes.widgetStage} ref={stageRef} style={{ transform }}>
          {widgets.map((widget) => {
            const group = widget.type.match(/([a-zA-Z]*)/)[0];
            const WidgetComponent = WIDGET_MAP[widget.type] || WIDGET_MAP[group];
            return (
              <WidgetComponent
                {...widget}
                group={group}
                zoom={zoom}
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
            {(contextState.id === null ? CONTEXTMENU_ITEMS_GENERAL : CONTEXTMENU_ITEMS_WIDGET).map((context, index) => {
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
