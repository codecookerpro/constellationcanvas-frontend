import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, MenuItem, Divider } from '@material-ui/core';
import { CONTEXTMENU_ITEMS_GENERAL, CONTEXTMENU_ITEMS_WIDGET, CONTEXTMENU_TYPES } from '../constants';
import { getForwardWidget, getBackwardWidget, getMaxDepth, getHoveredFigure } from '../helper';
import { createFigure, deleteFigure, setCopiedFigure, updateFigure, setFigureHovered } from 'actions';

const useContextMenu = ({ figures, zoom, stageRef, copiedFigure }) => {
  const dispatch = useDispatch();
  const [contextState, setContextState] = useState({
    uuid: null,
    mouseX: null,
    mouseY: null,
  });

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

  const handleContextMenu = (e) => {
    e.preventDefault();

    const hovered = getHoveredFigure(e, figures, stageRef, false);
    dispatch(setFigureHovered(hovered));

    setContextState({
      uuid: hovered,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  const MenuComponent = (
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
  );

  return {
    contextState,
    setContextState,
    handleContextMenu,
    MenuComponent,
  };
};

export default useContextMenu;
