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
import { getHoveredFigures, getForwardWidget, getBackwardWidget, getMaxDepth } from './helper';
import usePanZoom from 'use-pan-and-zoom';
import Selecto from 'react-selecto';
import WidgetGroup from './WidgetGroup';
import { useDispatch } from 'react-redux';
import { createFigure, deleteFigure, setCopiedFigure, updateFigure, setFigureHovered, setFigure } from 'actions';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  figureZoompane: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  figureStage: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});

const WidgetEditor = ({ figures, copiedFigure }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [transforming, setTransforming] = useState(null);
  const [contextState, setContextState] = useState({
    uuid: null,
    mouseX: null,
    mouseY: null,
  });
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [selectedFigures, setSelectedFigures] = useState([]);

  const stageRef = useRef();
  const rootRef = useRef();

  const blockedPanZoom = useMemo(
    () => transforming || contextState.mouseY || figures.filter((f) => f.hovered && f.type.match(WIDGET_GROUP_TYPES.text)).length,
    [transforming, contextState, figures]
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
    const tx = `${(event.clientX - baseX) / zoom - offsetX}px`;
    const ty = `${(event.clientY - baseY) / zoom - offsetY}px`;
    const figure = {
      type,
      data: {},
      transform: { tx, ty, rotate: '0deg', sx: '1', sy: '1' },
      depth: getMaxDepth(figures) + 1,
    };

    dispatch(createFigure(figure));
  };

  const handleTransform = ({ uuid, transform }) => {
    dispatch(setFigure({ uuid, transform }));
  };

  const handleDataChange = (uuid, data) => {
    dispatch(setFigure({ uuid, data }));
  };

  const handleTransformStart = (uuid) => {
    setTransforming(uuid);
  };

  const handleTransformEnd = (uuid) => {
    dispatch(updateFigure(figures.find((f) => f.uuid === uuid)));
    setTransforming(null);
  };

  const handleContextClick = (e, type) => {
    e.preventDefault();
    const { uuid, mouseX, mouseY } = contextState;
    const figure = figures.find((f) => f.uuid === contextState.uuid);

    switch (type) {
      case CONTEXTMENU_TYPES.front:
        const maxDepth = getMaxDepth(figures);
        figures
          .filter((f) => f.uuid === figure.uuid || f.depth > figure.depth)
          .map((f) => ({ ...f, depth: f.uuid === figure.uuid ? maxDepth : f.depth - 1 }))
          .forEach((f) => dispatch(updateFigure(f)));
        break;
      case CONTEXTMENU_TYPES.back:
        figures
          .filter((f) => f.uuid === figure.uuid || f.depth < figure.depth)
          .map((f) => ({ ...f, depth: f.uuid === figure.uuid ? 0 : f.depth + 1 }))
          .forEach((f) => dispatch(updateFigure(f)));
        break;
      case CONTEXTMENU_TYPES.forward:
        const forwardFigure = getForwardWidget(figures, figure.uuid, stageRef);
        if (forwardFigure) {
          dispatch(updateFigure({ ...figure, depth: forwardFigure.depth }));
          dispatch(updateFigure({ ...forwardFigure, depth: figure.depth }));
        }
        break;
      case CONTEXTMENU_TYPES.backward:
        const backwardFigure = getBackwardWidget(figures, figure.uuid, stageRef);
        if (backwardFigure) {
          dispatch(updateFigure({ ...figure, depth: backwardFigure.depth }));
          dispatch(updateFigure({ ...backwardFigure, depth: figure.depth }));
        }
        break;
      case CONTEXTMENU_TYPES.copy:
        dispatch(setCopiedFigure(uuid));
        break;
      case CONTEXTMENU_TYPES.cut:
        dispatch(setCopiedFigure(uuid));
        dispatch(deleteFigure(uuid));
        break;
      case CONTEXTMENU_TYPES.paste:
        const { x: baseX, y: baseY } = stageRef.current.getBoundingClientRect();
        const newFigure = {
          ...copiedFigure,
          depth: getMaxDepth(figures) + 1,
          transform: {
            ...copiedFigure.transform,
            tx: (mouseX - baseX) / zoom,
            ty: (mouseY - baseY) / zoom,
          },
        };
        dispatch(createFigure(newFigure));
        break;
      case CONTEXTMENU_TYPES.delete:
        dispatch(deleteFigure(uuid));
        break;

      default:
        break;
    }

    setContextState({
      uuid: null,
      mouseX: null,
      mouseY: null,
    });
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 0 && e.ctrlKey === false && contextState.mouseY === null && figures.length) {
      const hovered = getHoveredFigures(e, figures, stageRef);
      dispatch(setFigureHovered(hovered[0]?.uuid));
    } else if (!transforming && !e.ctrlKey && !contextState.id && e.buttons === 1) {
      setContextState({
        uuid: null,
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

    const hoveredFigures = getHoveredFigures(e, figures, stageRef);
    const frontWidget = hoveredFigures.sort((a, b) => b.depth - a.depth)?.[0];
    if (frontWidget === undefined) {
      setContextState({
        uuid: null,
        mouseX: e.clientX,
        mouseY: e.clientY,
      });
    } else {
      setContextState({
        uuid: frontWidget.uuid,
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
        className={classes.figureZoompane}
        ref={(el) => setContainer(el)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onContextMenu={handleContextMenu}
        onWheel={handleWheel}
      >
        <div className={classes.figureStage} ref={stageRef} style={{ transform }}>
          {figures.map((figure) => {
            const group = figure.type.match(/([a-zA-Z]*)/)[0];
            const WidgetComponent = WIDGET_MAP[figure.type] || WIDGET_MAP[group];
            return (
              <WidgetComponent
                {...figure}
                group={group}
                zoom={zoom}
                key={figure.uuid}
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
                  <MenuItem key={context.type} onClick={(e) => handleContextClick(e, context.type)} disabled={copiedFigure.id === null}>
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
            setSelectedFigures([]);
            e.added.forEach((el) => {
              el.classList.add('selected');
            });
            e.removed.forEach((el) => {
              el.classList.remove('selected');
            });
          }}
        />
      )}
      <WidgetGroup targets={selectedFigures} />
    </div>
  );
};

export default WidgetEditor;
