import _ from 'lodash';
import ObjectID from 'bson-objectid';
import pointInPolygon from 'point-in-polygon';
import overlap from 'polygon-overlap';
import { isNumber } from 'utils';
import { WIDGET_IMG_BASE_URL } from 'utils/constants/ui';
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
    sx = sTokens[1];
    sy = sTokens[2];
  }

  return { tx, ty, rotate, sx, sy, ...(t3dTokens && { tz }) };
};

export const transformToString = ({ tx = 0, ty = 0, rotate = 0, sx = 1, sy = 1 }) => {
  tx = isNumber(tx) ? `${tx}px` : tx;
  ty = isNumber(ty) ? `${ty}px` : ty;
  rotate = isNumber(rotate) ? `${rotate}deg` : rotate;

  return `translate(${tx}, ${ty}) rotate(${rotate}) scale(${sx}, ${sy})`;
};

export const getForwardWidget = (figures, uuid, ref) => {
  const figure = figures.find((f) => f.uuid === uuid);
  const overlaped = getOverlapedFigures(figures, ref, uuid);
  const depth = _.min(overlaped.map((f) => (f.depth <= figure.depth ? Infinity : f.depth)));

  return overlaped.find((f) => f.depth === depth);
};

export const getBackwardWidget = (figures, uuid, ref) => {
  const figure = figures.find((f) => f.uuid === uuid);
  const overlaped = getOverlapedFigures(figures, ref, uuid);

  const depth = _.max(overlaped.map((f) => (f.depth >= figure.depth ? -Infinity : f.depth)));

  return overlaped.find((f) => f.depth === depth);
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

export const getWidgetBoundaries = (ref, uuid) => {
  const widget = ref.current.querySelector(uuid === 'group' ? '[data-able-groupable=true]' : `#widget-container-${uuid}`);

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

export const getHoveredFigure = (e, figures, ref, includeGroup = false) => {
  const hoveredFigures = (includeGroup ? figures.concat({ uuid: 'group', depth: Infinity }) : figures)
    .filter((f) => {
      const points = getWidgetBoundaries(ref, f.uuid);
      return pointInPolygon([e.clientX, e.clientY], extendPolygon(points, 30));
    })
    .sort((a, b) => b.depth - a.depth);

  if (hoveredFigures.length) {
    return hoveredFigures[0].uuid;
  }

  return null;
};

export const getOverlapedFigures = (figures, ref, uuid) => {
  const points1 = getWidgetBoundaries(ref, uuid);

  return figures
    .filter((f) => {
      const points2 = getWidgetBoundaries(ref, f.uuid);
      return overlap(points1, points2);
    })
    .sort((a, b) => b.depth - a.depth);
};

export const getUniqueId = () => {
  const ts = new Date().getTime();
  return ObjectID(ts).toHexString();
};

export const getMaxDepth = (figures) => {
  return _.max(figures.map((f) => f.depth)) || 0;
};
