import ObjectID from 'bson-objectid';

export const parseTransform = (trans) => {
  const translate = trans.match(/translate\(([-0-9.]*(px)), ([0-9.]*(px))\)/);
  const rotate = trans.match(/rotate\(([-0-9.]*(deg|rad))\)/);
  const x = translate ? translate[1] : 0;
  const y = translate ? translate[3] : 0;
  const r = rotate ? rotate[1] : 0;

  return { x, y, r };
};

export const transformToString = ({ x = 0, y = 0, r = 0 }) => {
  x = parseFloat(x) === x ? `${x}px` : x;
  y = parseFloat(y) === y ? `${y}px` : y;
  r = parseFloat(r) === r ? `${r}deg` : r;

  return `translate(${x}, ${y}) rotate(${r})`;
};

export const getUniqueId = () => {
  const ts = new Date().getTime();
  return ObjectID(ts).toHexString();
};

export const bringToFront = (widgets, id) => {
  const widget = widgets.find((w) => w.id === id);

  return widgets.map((w) => {
    return {
      ...w,
      depth: w.id === widget.id ? widgets.length - 1 : w.depth > widget.depth ? w.depth - 1 : w.depth,
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

export const bringForward = (widgets, id) => {
  const widget = widgets.find((w) => w.id === id);

  return widgets.map((w) => {
    return {
      ...w,
      depth: w.id === widget.id ? widget.depth + 1 : w.depth === widget.depth + 1 ? w.depth - 1 : w.depth,
    };
  });
};

export const sendBackward = (widgets, id) => {
  const widget = widgets.find((w) => w.id === id);

  return widgets.map((w) => {
    return {
      ...w,
      depth: w.id === widget.id ? widget.depth - 1 : w.depth === widget.depth - 1 ? w.depth + 1 : w.depth,
    };
  });
};

export const extendPolygon = (polygon, dist = 30) => {
  let cx = 0, cy = 0;

  polygon.forEach(([x, y]) => {
    cx += x;
    cy += y;
  });

  cx /= polygon.length;
  cy /= polygon.length;

  return polygon.map(([x, y]) => {
    let dx = x - cx;
    let dy = y - cy;
    const norm = Math.sqrt(dx * dx + dy * dy);
    dx /= norm;
    dy /= norm;

    return [x + dx * dist, y + dy * dist];
  });
};
