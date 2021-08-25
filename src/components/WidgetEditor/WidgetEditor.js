import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { makeStyles, Menu, MenuItem } from '@material-ui/core';
import { WIDGET_MAP, WIDGET_GROUP_TYPES, WIDGET_EDITOR_SCALE_LIMIT, DOUBLE_CLICK_INTERVAL, CLICK_INTERVAL, COPY_CANVAS_MENU } from './constants';
import { getHoveredFigure, getMaxDepth } from './helper';
import usePanZoom from 'use-pan-and-zoom';
import Selecto from 'react-selecto';
import WidgetGroup from './WidgetGroup';
import { useDispatch } from 'react-redux';
import { createFigure, updateFigure, setFigureHovered, copyCanvasTo, setSelectedFigure, setCopiedFigure, deleteFigure } from 'actions';
import { toArray } from 'utils';
import useContextMenu from './hooks/use-context-menu';
import { Button } from 'components/form-components';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  figureZoompane: {
    width: '100%',
    height: 'calc(100% - 85px)',
  },
  figureStage: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  buttonArea: {
    width: '100%',
    height: 85,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  saveButton: {
    height: 45,
    width: 170,
    marginRight: 23,
    borderRadius: 13,
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyButton: {
    height: 45,
    width: 220,
    marginRight: 18,
    borderRadius: 13,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.palette.contrastText,
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    },
  },
}));

const WidgetEditor = ({ index, figures, copiedFigure, editable = false }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const stageRef = useRef();
  const rootRef = useRef();

  const [activeFigures, setActiveFigures] = useState([]);
  const [panEnabled, setPanEnabled] = useState(false);
  const [figureGroup, setFigureGroup] = useState([]);
  const [mouseDownTime, setMouseDownTime] = useState(new Date());
  const [copyMenuAnchorEl, setCopyMenuAnchorEl] = useState(null);

  const { transform, zoom, panZoomHandlers, setContainer, setZoom } = usePanZoom({
    minZoom: WIDGET_EDITOR_SCALE_LIMIT.min,
    maxZoom: WIDGET_EDITOR_SCALE_LIMIT.max,
    enableZoom: false,
  });

  const { contextState, handleContextMenu, MenuComponent } = useContextMenu({ figures, stageRef, zoom, copiedFigure });

  const blockedPanZoom = useMemo(
    () => activeFigures.length || contextState.mouseY || figures.filter((f) => f.hovered && f.type.match(WIDGET_GROUP_TYPES.text)).length,
    [activeFigures, contextState, figures]
  );

  const copyCanvasMenuItems = useMemo(
    () => COPY_CANVAS_MENU.map((item, idx) => ({ ...item, canvasIndex: idx })).filter((_, idx) => idx !== index),
    [index]
  );

  const hoveredFigure = useMemo(() => figures.find((f) => f.hovered), [figures]);
  const selectedFigure = useMemo(() => figures.find((f) => f.selected), [figures]);

  useEffect(() => {
    setFigureGroup([]);
    setActiveFigures([]);
  }, [index]);

  const handleDragOver = (event) => {
    if (editable) {
      event.preventDefault();
    }
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

  const handleMouseDown = (e) => {
    const currentTime = new Date();
    if (currentTime - mouseDownTime < DOUBLE_CLICK_INTERVAL) {
      panZoomHandlers.onMouseDown(e);
      setPanEnabled(true);
    } else {
      dispatch(setSelectedFigure(hoveredFigure?.uuid));
    }

    setMouseDownTime(currentTime);
  };

  const handleMouseUp = (e) => {
    const currentTime = new Date();
    if (panEnabled) {
      setPanEnabled(false);
    } else if (currentTime - mouseDownTime < CLICK_INTERVAL && !getHoveredFigure(e, figures, stageRef, true)) {
      setFigureGroup([]);
    }
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 0 && figures.length && !contextState.uuid) {
      const hovered = getHoveredFigure(e, figures, stageRef, true);
      const oldHovered = figures.find((f) => f.hovered)?.uuid || null;

      if (hovered !== oldHovered) {
        dispatch(setFigureHovered(hovered));
      }
    }

    if (!blockedPanZoom && e.buttons === 1 && panEnabled) {
      panZoomHandlers.onMouseMove(e);
    }
  };

  const handleWheel = (e) => {
    if (!blockedPanZoom) {
      setZoom(zoom - e.deltaY * 0.001);
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        setActiveFigures([]);
        setFigureGroup([]);
      } else if (e.key === 'Delete' && selectedFigure) {
        dispatch(deleteFigure(selectedFigure.uuid));
      } else if (e.metaKey || e.ctrlKey) {
        if (e.key === 'c' && selectedFigure) {
          dispatch(setCopiedFigure(selectedFigure.uuid));
        } else if (e.key === 'v' && copiedFigure) {
          const {
            transform: { tx, ty },
          } = copiedFigure;
          const newFigure = {
            ...copiedFigure,
            depth: getMaxDepth(figures) + 1,
            transform: {
              ...copiedFigure.transform,
              tx: `${parseFloat(tx) + 50}px`,
              ty: `${parseFloat(ty) + 50}px`,
            },
          };
          dispatch(createFigure(newFigure));
        }
      }
    },
    [selectedFigure, copiedFigure, figures, dispatch]
  );

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

  const toggleCopyCanvasMenu = (e) => {
    setCopyMenuAnchorEl(e.currentTarget);
  };

  const handleSaveAsPDF = (e) => {
    e.preventDefault();
    window.print();
  };

  const handleCopyCanvas = (canvasIndex) => {
    setCopyMenuAnchorEl(null);
    dispatch(copyCanvasTo(canvasIndex));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [figures, handleKeyDown]);

  return (
    <div className={classes.root} ref={rootRef} id="widget-editor-wrapper">
      <div
        id="widget-editor"
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
                editable={editable}
                group={group}
                zoom={zoom}
                key={figure.uuid}
                onTransformStart={handleTransformStart}
                onTransformEnd={handleTransformEnd}
              />
            );
          })}
          <WidgetGroup
            targets={figureGroup}
            figures={figures}
            zoom={zoom}
            onTransformStart={handleTransformStart}
            onTransformEnd={handleTransformEnd}
          />
          {MenuComponent}
        </div>
      </div>
      <div className={classes.buttonArea}>
        <Button color="primary" variant="contained" className={classes.saveButton} onClick={handleSaveAsPDF}>
          Save as PDF
        </Button>
        {editable && (
          <Button color="primary" variant="contained" className={classes.copyButton} onClick={toggleCopyCanvasMenu}>
            Copy Canvas to ...
          </Button>
        )}
        <Menu
          id="copy-canvas-menu"
          anchorEl={copyMenuAnchorEl}
          keepMounted
          open={Boolean(copyMenuAnchorEl)}
          onClose={() => setCopyMenuAnchorEl(null)}
        >
          {copyCanvasMenuItems.map(({ title, canvasIndex }) => (
            <MenuItem key={title} onClick={() => handleCopyCanvas(canvasIndex)}>
              {title}
            </MenuItem>
          ))}
        </Menu>
      </div>
      {editable && !panEnabled && !activeFigures.length && (
        <Selecto container={rootRef.current} selectableTargets={['.widget']} onSelect={handleSelectFigures} />
      )}
    </div>
  );
};

export default WidgetEditor;
