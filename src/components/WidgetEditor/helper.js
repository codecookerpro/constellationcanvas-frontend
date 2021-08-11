import _ from 'lodash';
import pointInPolygon from 'point-in-polygon';
import overlap from 'polygon-overlap';
import { isNumber } from 'utils';
import { WIDGET_IMG_BASE_URL } from 'constants/user-interface';
import { WIDGET_GROUPS } from './constants';

export const getImgUrl = (group, type) => `${WIDGET_IMG_BASE_URL}${group}/${type}.${WIDGET_GROUPS.find((g) => g.type === group).imageType}`;

export const parseTransform = (trans) => {
  const t2dTokens = trans.match(/translate\(([-0-9.]*(px)), ([-0-9.]*(px))\)/);
  const t3dTokens = trans.match(/translate3d\(([-0-9.]*(px)), ([-0-9.]*(px)), ([-0-9.]*(px))\)/);
  const rTokens = trans.match(/rotate\(([-0-9.]*(deg|rad))\)/);
  const sTokens = trans.match(/scale\(([-0-9.]*), ([-0-9.]*)\)/);
  let tx = 0;
  let ty = 0;
  let tz = 0;
  let rotate = 0;
  let sx = 0;
  let sy = 0;

  if (t3dTokens) {
    tx = t3dTokens[1];
    ty = t3dTokens[3];
    tz = t3dTokens[5];
  } else if (t2dTokens) {
    tx = t2dTokens[1];
    ty = t2dTokens[3];
  }

  if (rTokens) {
    rotate = rTokens[1];
  }

  if (sTokens) {
    sx = parseFloat(sTokens[1]);
    sy = parseFloat(sTokens[2]);
  }

  return { tx, ty, rotate, sx, sy, ...(t3dTokens && { tz }) };
};

export const transformToString = ({ tx = 0, ty = 0, rotate = 0, sx = 1, sy = 1 }) => {
  tx = isNumber(tx) ? `${tx}px` : tx;
  ty = isNumber(ty) ? `${ty}px` : ty;
  rotate = isNumber(rotate) ? `${rotate}deg` : rotate;

  return `translate(${tx}, ${ty}) rotate(${rotate}) scale(${sx}, ${sy})`;
};

export const getForwardWidget = (widgets, id, ref) => {
  const widget = widgets.find((w) => w.id === id);
  const overlapedWidgets = getOverlapedWidgets(widgets, ref, id);

  const depth = _.min(overlapedWidgets.map((w) => (w.depth - widget.depth <= 0 ? Infinity : w.depth)));

  return overlapedWidgets.find((w) => w.depth === depth);
};

export const getBackwardWidget = (widgets, id, ref) => {
  const widget = widgets.find((w) => w.id === id);
  const overlapedWidgets = getOverlapedWidgets(widgets, ref, id);

  const depth = _.max(overlapedWidgets.map((w) => (w.depth - widget.depth >= 0 ? -1 : w.depth)));

  return overlapedWidgets.find((w) => w.depth === depth);
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

export const getWidgetBoundaries = (ref, id) => {
  const widget = ref.current.querySelector(`#widget-${id}`);

  const points = [
    widget?.querySelector('.moveable-rotation-control'),
    widget?.querySelector('.moveable-ne'),
    widget?.querySelector('.moveable-se'),
    widget?.querySelector('.moveable-sw'),
    widget?.querySelector('.moveable-nw'),
  ]
    .filter((d) => d)
    .map((c) => c.getBoundingClientRect())
    .map(({ x, y }) => [x, y]);

  return points;
};

export const getHoveredWidgets = (e, widgets, ref) => {
  return widgets
    .map((w) => {
      const points = getWidgetBoundaries(ref, w.id);
      const hovered = pointInPolygon([e.clientX, e.clientY], extendPolygon(points, 30));
      return { ...w, hovered };
    })
    .filter((w) => w.hovered);
};

export const getOverlapedWidgets = (widgets, ref, id) => {
  const points1 = getWidgetBoundaries(ref, id);

  return widgets
    .map((w) => {
      const points2 = getWidgetBoundaries(ref, w.id);
      const overlaped = overlap(points1, points2);
      return { ...w, overlaped };
    })
    .filter((w) => w.overlaped)
    .sort((a, b) => b.depth - a.depth);
};
