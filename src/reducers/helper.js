import _ from 'lodash';
import ObjectID from 'bson-objectid';

export const getUniqueId = () => {
  const ts = new Date().getTime();
  return ObjectID(ts).toHexString();
};

export const getMaxDepth = (widgets) => {
  return _.max(widgets.map((w) => w.depth));
};

export const bringToFront = (widgets, id) => {
  const widget = widgets.find((w) => w.id === id);

  return widgets.map((w) => {
    return {
      ...w,
      depth: w.id === widget.id ? getMaxDepth(widgets) : w.depth > widget.depth ? w.depth - 1 : w.depth,
    };
  });
};

export const sendToBack = (widgets, id) => {
  const widget = widgets.find((w) => w.id === id);

  return widgets.map((w) => {
    return {
      ...w,
      depth: w.id === widget.id ? 0 : w.depth < widget.depth ? w.depth + 1 : w.depth,
    };
  });
};
