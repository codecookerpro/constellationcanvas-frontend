import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, MenuItem, Divider } from '@material-ui/core';
import { CONTEXTMENU_ITEMS_GENERAL, CONTEXTMENU_ITEMS_WIDGET, CONTEXTMENU_TYPES } from '../constants';
import { getForwardWidget, getBackwardWidget, getMaxDepth, getHoveredFigure } from '../helper';
import { createFigure, deleteFigure, setCopiedFigure, updateFigure, setSelectedFigure } from 'actions';
import { ShapeColorDialog } from '../components';

const useContextMenu = ({ figures, zoom, stageRef, copiedFigure }) => {
  const dispatch = useDispatch();
  const [contextState, setContextState] = useState({
    uuid: null,
    mouseX: null,
    mouseY: null,
  });
  const [openedShapeColorDlg, showShapeColorDlg] = useState(false);

  const targetFigure = useMemo(() => figures.find((f) => f.uuid === contextState.uuid), [figures, contextState]);
  const menuItems = useMemo(() => {
    if (contextState.uuid) {
      return CONTEXTMENU_ITEMS_WIDGET.filter((item) => !item.widget || targetFigure.type.includes(item.widget));
    }
    return CONTEXTMENU_ITEMS_GENERAL;
  }, [targetFigure, contextState]);

  const handleContextClick = (e, type) => {
    e.preventDefault();
    const { uuid, mouseX, mouseY } = contextState;

    switch (type) {
      case CONTEXTMENU_TYPES.front:
        const maxDepth = getMaxDepth(figures);
        figures
          .filter((f) => f.uuid === targetFigure.uuid || f.depth > targetFigure.depth)
          .map((f) => ({ ...f, depth: f.uuid === targetFigure.uuid ? maxDepth : f.depth - 1 }))
          .forEach((f) => dispatch(updateFigure(f)));
        break;
      case CONTEXTMENU_TYPES.back:
        figures
          .filter((f) => f.uuid === targetFigure.uuid || f.depth < targetFigure.depth)
          .map((f) => ({ ...f, depth: f.uuid === targetFigure.uuid ? 0 : f.depth + 1 }))
          .forEach((f) => dispatch(updateFigure(f)));
        break;
      case CONTEXTMENU_TYPES.forward:
        const forwardFigure = getForwardWidget(figures, targetFigure.uuid, stageRef);
        if (forwardFigure) {
          dispatch(updateFigure({ ...targetFigure, depth: forwardFigure.depth }));
          dispatch(updateFigure({ ...forwardFigure, depth: targetFigure.depth }));
        }
        break;
      case CONTEXTMENU_TYPES.backward:
        const backwardFigure = getBackwardWidget(figures, targetFigure.uuid, stageRef);
        if (backwardFigure) {
          dispatch(updateFigure({ ...targetFigure, depth: backwardFigure.depth }));
          dispatch(updateFigure({ ...backwardFigure, depth: targetFigure.depth }));
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
      case CONTEXTMENU_TYPES.incFontSize:
        dispatch(
          updateFigure({
            ...targetFigure,
            data: { ...targetFigure.data, fontSize: targetFigure.data?.fontSize ? targetFigure.data.fontSize + 3 : 21 },
          })
        );
        break;
      case CONTEXTMENU_TYPES.decFontSize:
        dispatch(
          updateFigure({
            ...targetFigure,
            data: { ...targetFigure.data, fontSize: targetFigure.data?.fontSize ? targetFigure.data.fontSize - 3 : 15 },
          })
        );
        break;
      case CONTEXTMENU_TYPES.colorPalette:
        console.log(targetFigure);
        showShapeColorDlg(true);
        return;
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
    dispatch(setSelectedFigure(hovered));

    setContextState({
      uuid: hovered,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  const applyShapeColor = ({ strokeColor, fillColor }) => {
    dispatch(updateFigure({ ...targetFigure, data: { ...targetFigure.data, strokeColor, fillColor } }));
    showShapeColorDlg(false);
    setContextState({ uuid: null, mouseX: null, mouseY: null });
  };

  const MenuComponent = (
    <>
      <Menu
        keepMounted
        open={contextState.mouseY !== null}
        onClose={handleContextClick}
        anchorReference="anchorPosition"
        anchorPosition={
          contextState.mouseY !== null && contextState.mouseX !== null ? { top: contextState.mouseY, left: contextState.mouseX } : undefined
        }
        transitionDuration={0}
      >
        {menuItems.map((context, index) =>
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
      <ShapeColorDialog open={openedShapeColorDlg} data={targetFigure?.data} onClose={() => showShapeColorDlg(false)} onSubmit={applyShapeColor} />
    </>
  );

  return {
    contextState,
    setContextState,
    handleContextMenu,
    MenuComponent,
  };
};

export default useContextMenu;
