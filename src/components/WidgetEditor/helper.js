import _ from 'lodash';
import ObjectID from 'bson-objectid';
import pointInPolygon from 'point-in-polygon';
import overlap from 'polygon-overlap';

export const parseTransform = (trans) => {
  const translate = trans.match(/translate\(([-0-9.]*(px)), ([-0-9.]*(px))\)/);
  const translate3d = trans.match(/translate3d\(([-0-9.]*(px)), ([-0-9.]*(px)), ([-0-9.]*(px))\)/);
  const rotate = trans.match(/rotate\(([-0-9.]*(deg|rad))\)/);
  let x = 0,
    y = 0,
    z = 0,
    r = 0;

  if (translate3d) {
    x = translate3d[1];
    y = translate3d[3];
    z = translate3d[5];
  } else if (translate) {
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

export const bringForward = (widgets, id, ref) => {
  const widget = widgets.find((w) => w.id === id);

  const overlapedWidgets = getOverlapedWidgets(widgets, ref, id);
  let diff = Infinity;
  overlapedWidgets.forEach((w) => {
    if (w.depth > widget.depth) diff = Math.min(diff, w.depth - widget.depth);
  });
  diff = diff === Infinity ? 0 : diff;

  return widgets.map((w) => {
    return {
      ...w,
      depth: w.id === widget.id ? widget.depth + diff : w.depth === widget.depth + diff ? w.depth - 1 : w.depth,
    };
  });
};

export const sendBackward = (widgets, id, ref) => {
  const widget = widgets.find((w) => w.id === id);

  const overlapedWidgets = getOverlapedWidgets(widgets, ref, id);
  let diff = Infinity;
  overlapedWidgets.forEach((w) => {
    if (w.depth < widget.depth) diff = Math.min(diff, widget.depth - w.depth);
  });
  diff = diff === Infinity ? 0 : diff;

  return widgets.map((w) => {
    return {
      ...w,
      depth: w.id === widget.id ? widget.depth - diff : w.depth === widget.depth - diff ? w.depth + 1 : w.depth,
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

export const getOverlapedWidgets = (widgets, ref, id) => {
  const widget1 = ref.current.querySelector(`#widget-${id}`);
  const points1 = [
    widget1?.querySelector('.moveable-rotation-control'),
    widget1?.querySelector('.moveable-ne'),
    widget1?.querySelector('.moveable-se'),
    widget1?.querySelector('.moveable-sw'),
    widget1?.querySelector('.moveable-nw'),
  ]
    .filter((d) => d)
    .map((c) => c.getBoundingClientRect())
    .map(({ x, y }) => [x, y]);

  return widgets
    .map((w) => {
      const widget2 = ref.current.querySelector(`#widget-${w.id}`);
      const points2 = [
        widget2?.querySelector('.moveable-rotation-control'),
        widget2?.querySelector('.moveable-ne'),
        widget2?.querySelector('.moveable-se'),
        widget2?.querySelector('.moveable-sw'),
        widget2?.querySelector('.moveable-nw'),
      ]
        .filter((d) => d)
        .map((c) => c.getBoundingClientRect())
        .map(({ x, y }) => [x, y]);
      const overlaped = overlap(points1, points2);
      return { ...w, overlaped };
    })
    .filter((w) => w.overlaped)
    .sort((a, b) => b.depth - a.depth);
};

export const getMaxDepth = (widgets) => {
  return _.max(widgets.map((w) => w.depth));
};
