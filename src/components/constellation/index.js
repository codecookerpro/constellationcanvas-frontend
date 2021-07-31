import React, { useRef, useState } from 'react';
import Human, { transformer as humanTransformer } from './widgets/Human';
import { makeStyles } from '@material-ui/core';
import { WIDGET_TYPES } from 'constants/common';
import ObjectID from 'bson-objectid';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
});

const widgetsMap = {
  [WIDGET_TYPES.human]: {
    component: Human,
    transformer: humanTransformer,
  },
};

const initialWidgets = [
  {
    id: 1,
    type: WIDGET_TYPES.human,
    transforms: humanTransformer([500, 500]),
  },
];

const WidgetStage = () => {
  const classes = useStyles();
  const [widgets, setWidgets] = useState(initialWidgets);
  const stageRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const { offsetX, offsetY, type } = JSON.parse(event.dataTransfer.getData('application/constellation-widget'));
    const { x: baseX, y: baseY } = stageRef.current.getBoundingClientRect();
    const transX = event.clientX - baseX - offsetX;
    const transY = event.clientY - baseY - offsetY;
    const transformer = widgetsMap[type].transformer;
    const currentTimestamp = new Date().getTime();
    const objectId = ObjectID(currentTimestamp).toHexString();
    const newWidget = {
      id: objectId,
      type,
      transforms: transformer([transX, transY]),
    };
    setWidgets((widgets) => widgets.concat(newWidget));
  };

  const handleTransform = (widget, element, transform) => {
    setWidgets(
      widgets.map((wid) =>
        wid.id === widget
          ? {
              ...wid,
              transforms: {
                ...wid.transforms,
                [element]: transform,
              },
            }
          : wid
      )
    );
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className={classes.root} ref={stageRef}>
      {widgets.map(({ id, type, transforms }, idx) => {
        const Widget = widgetsMap[type].component;
        return <Widget key={idx} transforms={transforms} onTransform={(element, transform) => handleTransform(id, element, transform)} />;
      })}
    </div>
  );
};

export default WidgetStage;
