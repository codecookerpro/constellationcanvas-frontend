import ObjectID from 'bson-objectid';
import pointInPolygon from 'point-in-polygon';

export const parseTransform = (trans) => {
  const translate = trans.match(/translate\(([-0-9.]*(px)), ([-0-9.]*(px))\)/);
  const translate3d = trans.match(/translate3d\(([-0-9.]*(px)), ([-0-9.]*(px)), ([-0-9.]*(px))\)/);
  const rotate = trans.match(/rotate\(([-0-9.]*(deg|rad))\)/);
  let x = 0,
    y = 0,
    z = 0,
    r = 0;

  if (translate3d && translate3d.length === 7) {
    x = translate3d[1];
    y = translate3d[3];
    z = translate3d[5];
  } else if (translate && translate.length === 5) {
    x = translate[1];
    y = translate[3];
  }

  if (rotate) {
    r = rotate[1];
  }

  return { x, y, z, r };
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
  let cx = 0,
    cy = 0;

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

export const getHoveredWidgets = (widgets, ref, e) => {
  return widgets
    .map((w) => {
      const widgetContainer = ref.current.querySelector(`#widget-${w.id}`);
      const points = [
        widgetContainer?.querySelector('.moveable-rotation-control'),
        widgetContainer?.querySelector('.moveable-ne'),
        widgetContainer?.querySelector('.moveable-se'),
        widgetContainer?.querySelector('.moveable-sw'),
        widgetContainer?.querySelector('.moveable-nw'),
      ]
        .filter((d) => d)
        .map((c) => c.getBoundingClientRect())
        .map(({ x, y }) => [x, y]);
      const hovered = pointInPolygon([e.clientX, e.clientY], extendPolygon(points, 30));

      return { ...w, hovered };
    })
    .filter((w) => w.hovered);
};
