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
  DOUBLE_CLICK_INTERVAL,
  CLICK_INTERVAL,
} from './constants';
import { getHoveredFigures, getForwardWidget, getBackwardWidget, getMaxDepth } from './helper';
import usePanZoom from 'use-pan-and-zoom';
import Selecto from 'react-selecto';
import WidgetGroup from './WidgetGroup';
import { useDispatch } from 'react-redux';
import { createFigure, deleteFigure, setCopiedFigure, updateFigure, setFigureHovered } from 'actions';
import { toArray } from 'utils';

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

const WidgetEditor = ({ index, figures, copiedFigure }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeFigures, setActiveFigures] = useState([]);
  const [contextState, setContextState] = useState({
    uuid: null,
    mouseX: null,
    mouseY: null,
  });
  const [panEnabled, setPanEnabled] = useState(false);
  const [figureGroup, setFigureGroup] = useState([]);
  const [mouseDownTime, setMouseDownTime] = useState(new Date());

  const stageRef = useRef();
  const rootRef = useRef();

  const blockedPanZoom = useMemo(
    () => activeFigures.length || contextState.mouseY || figures.filter((f) => f.hovered && f.type.match(WIDGET_GROUP_TYPES.text)).length,
    [activeFigures, contextState, figures]
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

  const handleTransformStart = (uuids) => {
    setActiveFigures(toArray(uuids));
  };

  const handleTransformEnd = (uuid, params) => {
    dispatch(updateFigure({ uuid, ...params }));
    setTimeout(() => setActiveFigures([]));
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

  const getHoveredFigure = (e, includeGroup = false) => {
    const hoveredFigures = getHoveredFigures(e, figures, stageRef, includeGroup);
    let hovered = null;

    if (hoveredFigures.length && (includeGroup || !figureGroup.map((f) => f.id).includes(hoveredFigures[0].uuid))) {
      hovered = hoveredFigures[0].uuid;
    }

    return hovered;
  };

  const handleMouseDown = (e) => {
    const currentTime = new Date();
    if (currentTime - mouseDownTime < DOUBLE_CLICK_INTERVAL) {
      panZoomHandlers.onMouseDown(e);
      setPanEnabled(true);
    }

    setMouseDownTime(currentTime);
  };

  const handleMouseUp = (e) => {
    const currentTime = new Date();
    if (panEnabled) {
      setPanEnabled(false);
    } else if (currentTime - mouseDownTime < CLICK_INTERVAL && !getHoveredFigure(e, true)) {
      setFigureGroup([]);
    }
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 0 && figures.length && !contextState.uuid) {
      const hovered = getHoveredFigure(e);
      dispatch(setFigureHovered(hovered));
    }

    if (!blockedPanZoom && e.buttons === 1 && panEnabled) {
      panZoomHandlers.onMouseMove(e);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();

    const hovered = getHoveredFigure(e);
    dispatch(setFigureHovered(hovered));

    setContextState({
      uuid: hovered,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  const handleWheel = (e) => {
    if (!blockedPanZoom) {
      setZoom(zoom - e.deltaY * 0.001);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setActiveFigures([]);
      setFigureGroup([]);
    }
  };

  const handleSelectFigures = (e) => {
    if (e.selected.length > 1) {
      e.added.forEach((el) => {
        el.classList.add('selected');
      });
      e.removed.forEach((el) => {
        el.classList.remove('selected');
      });

      setFigureGroup(e.selected);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFigureGroup([]);
    setActiveFigures([]);
  }, [index]);

  return (
    <div className={classes.root} ref={rootRef} id="widget-editor-wrapper">
      <div
        {...panZoomHandlers}
        className={classes.figureZoompane}
        ref={(el) => setContainer(el)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
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
                onTransformStart={handleTransformStart}
                onTransformEnd={handleTransformEnd}
              />
            );
          })}
          <WidgetGroup targets={figureGroup} zoom={zoom} onTransformStart={handleTransformStart} onTransformEnd={handleTransformEnd} />
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
            {(contextState.uuid === null ? CONTEXTMENU_ITEMS_GENERAL : CONTEXTMENU_ITEMS_WIDGET).map((context, index) =>
              context.type === CONTEXTMENU_TYPES.divider ? (
                <Divider key={context.type + index} />
              ) : context.type === CONTEXTMENU_TYPES.paste ? (
                <MenuItem key={context.type} onClick={(e) => handleContextClick(e, context.type)} disabled={!copiedFigure.uuid}>
                  {context.label}
                </MenuItem>
              ) : (
                <MenuItem key={context.type} onClick={(e) => handleContextClick(e, context.type)}>
                  {context.label}
                </MenuItem>
              )
            )}
          </Menu>
        </div>
      </div>
      {!panEnabled && !activeFigures.length && <Selecto container={rootRef.current} selectableTargets={['.widget']} onSelect={handleSelectFigures} />}
    </div>
  );
};

export default WidgetEditor;
