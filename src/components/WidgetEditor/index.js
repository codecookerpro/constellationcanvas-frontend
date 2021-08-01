import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { DROP_EFFECT, WIDGET_MAP, WIDGET_TYPES, ORDER_TYPE } from './constants';
import { getUniqueId } from './helper';

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
  };

  const handleTransform = ({ id, element, type, transform }) => {
    // console.log(id, element, type, transform);
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

    const widget = widgets.find((w) => w.id === contextState.id);

    if (type === ORDER_TYPE.front) {
      setWidgets(
        widgets.map((w) => {
          if (w.id !== widget.id) {
            if (w.depth > widget.depth) {
              return {
                ...w,
                depth: w.depth - 1,
              };
            } else return w;
          }
          return {
            ...widget,
            depth: widgets.length - 1,
          };
        })
      );
    } else if (type === ORDER_TYPE.back) {
      setWidgets(
        widgets.map((w) => {
          if (w.id !== widget.id) {
            if (w.depth < widget.depth) {
              return {
                ...w,
                depth: w.depth + 1,
              };
            } else return w;
          }
          return {
            ...widget,
            depth: 0,
          };
        })
      );
    } else if (type === ORDER_TYPE.forward) {
      setWidgets(
        widgets.map((w) => {
          if (w.id !== widget.id) {
            if (w.depth === widget.depth + 1) {
              return {
                ...w,
                depth: w.depth - 1,
              };
            } else return w;
          }
          return {
            ...widget,
            depth: widget.depth + 1,
          };
        })
      );
    } else if (type === ORDER_TYPE.backward) {
      setWidgets(
        widgets.map((w) => {
          if (w.id !== widget.id) {
            if (w.depth === widget.depth - 1) {
              return {
                ...w,
                depth: w.depth + 1,
              };
            } else return w;
          }
          return {
            ...widget,
            depth: widget.depth - 1,
          };
        })
      );
    }

    setContextState({
      id: null,
      mouseX: null,
      mouseY: null,
    });
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className={classes.root} ref={stageRef} id="widget-editor">
      {widgets.map((widget) => {
        const group = WIDGET_TYPES.find((wtype) => wtype.type === widget.type).group;
        const WidgetComponent = WIDGET_MAP[widget.type] || WIDGET_MAP[group];
        return <WidgetComponent {...widget} key={widget.id} onTransform={handleTransform} onContextMenu={handleContextMenu} />;
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
        <MenuItem onClick={(e) => handleChangeDepth(e, ORDER_TYPE.front)}>Bring to Front</MenuItem>
        <MenuItem onClick={(e) => handleChangeDepth(e, ORDER_TYPE.back)}>Send to Back</MenuItem>
        <MenuItem onClick={(e) => handleChangeDepth(e, ORDER_TYPE.forward)}>Bring Forward</MenuItem>
        <MenuItem onClick={(e) => handleChangeDepth(e, ORDER_TYPE.backward)}>Send Backward</MenuItem>
      </Menu>
    </div>
  );
};

export default WidgetEditor;
