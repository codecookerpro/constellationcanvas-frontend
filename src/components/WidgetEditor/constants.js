import { keyMirror } from 'utils';

import FigureWidget from './widgets/FigureWidget';
import TextWidget from './widgets/TextWidget';

export const TEXT_WIDGET_DEFAULT_PROPS = {
  text1: { padding: { top: 0.07, right: 0.05, bottom: 0.07, left: 0.05 }, width: 154, height: 64 },
  text2: { padding: { top: 0.09, right: 0.07, bottom: 0.25, left: 0.07 }, width: 112, height: 108 },
  text3: { padding: { top: 0.22, right: 0.18, bottom: 0.28, left: 0.12 }, width: 168, height: 132 },
  text4: { padding: { top: 0.27, right: 0.26, bottom: 0.38, left: 0.2 }, width: 178, height: 170 },
};

export const TRANS_TYPES = keyMirror({
  rotate: null,
  drag: null,
  resize: null,
  land: null,
  scale: null,
});

export const WIDGET_GROUP_TYPES = keyMirror({
  lego: null,
  family: null,
  peg: null,
  chess: null,
  animal: null,
  emotion: null,
  object: null,
  shape: null,
  capacity: null,
  arrow: null,
  text: null,
  relationship: null,
});

export const WIDGET_GROUPS = [
  {
    type: WIDGET_GROUP_TYPES.lego,
    label: 'Figures (Lego)',
    draggable: true,
    scalable: true,
    rotatable: false,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 19,
  },
  {
    type: WIDGET_GROUP_TYPES.family,
    label: 'Figures (Family)',
    draggable: true,
    scalable: true,
    rotatable: false,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 14,
  },
  {
    type: WIDGET_GROUP_TYPES.peg,
    label: 'Figures (Pegs)',
    draggable: true,
    scalable: true,
    rotatable: false,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 6,
  },
  {
    type: WIDGET_GROUP_TYPES.chess,
    label: 'Figures (Chess)',
    draggable: true,
    scalable: true,
    rotatable: false,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 6,
  },
  {
    type: WIDGET_GROUP_TYPES.animal,
    label: 'Figures (Animals)',
    draggable: true,
    scalable: true,
    rotatable: false,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 12,
  },
  {
    type: WIDGET_GROUP_TYPES.object,
    label: 'Objects',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 9,
  },
  {
    type: WIDGET_GROUP_TYPES.arrow,
    label: 'Directional Arrows',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'svg',
    count: 6,
  },
  {
    type: WIDGET_GROUP_TYPES.shape,
    label: 'Shapes',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: false,
    defaultArea: 10000,
    imageType: 'svg',
    count: 4,
  },
  {
    type: WIDGET_GROUP_TYPES.text,
    label: 'Text Controls',
    draggable: true,
    scalable: true,
    rotatable: false,
    keepRatio: false,
    defaultArea: 10000,
    imageType: 'svg',
    count: 4,
  },
  {
    type: WIDGET_GROUP_TYPES.relationship,
    label: 'Relationships',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: false,
    defaultArea: 4000,
    imageType: 'svg',
    count: 10,
  },
  {
    type: WIDGET_GROUP_TYPES.capacity,
    label: 'Capacity/Energy',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 5,
  },
  {
    type: WIDGET_GROUP_TYPES.emotion,
    label: 'Emotions',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'svg',
    count: 6,
  },
];

export const WIDGET_MAP = {
  [WIDGET_GROUP_TYPES.lego]: FigureWidget,
  [WIDGET_GROUP_TYPES.family]: FigureWidget,
  [WIDGET_GROUP_TYPES.peg]: FigureWidget,
  [WIDGET_GROUP_TYPES.chess]: FigureWidget,
  [WIDGET_GROUP_TYPES.animal]: FigureWidget,
  [WIDGET_GROUP_TYPES.emotion]: FigureWidget,
  [WIDGET_GROUP_TYPES.object]: FigureWidget,
  [WIDGET_GROUP_TYPES.shape]: FigureWidget,
  [WIDGET_GROUP_TYPES.capacity]: FigureWidget,
  [WIDGET_GROUP_TYPES.arrow]: FigureWidget,
  [WIDGET_GROUP_TYPES.text]: TextWidget,
  [WIDGET_GROUP_TYPES.relationship]: FigureWidget,
};

export const CONTEXTMENU_TYPES = keyMirror({
  front: null,
  back: null,
  forward: null,
  backward: null,
  divider: null,
  copy: null,
  cut: null,
  paste: null,
  delete: null,
});

export const CONTEXTMENU_ITEMS_GENERAL = [
  {
    type: CONTEXTMENU_TYPES.paste,
    label: 'Paste',
  },
];

export const CONTEXTMENU_ITEMS_WIDGET = [
  {
    type: CONTEXTMENU_TYPES.front,
    label: 'Bring to Front',
  },
  {
    type: CONTEXTMENU_TYPES.back,
    label: 'Send to Back',
  },
  {
    type: CONTEXTMENU_TYPES.forward,
    label: 'Bring Forward',
  },
  {
    type: CONTEXTMENU_TYPES.backward,
    label: 'Send Backward',
  },
  {
    type: CONTEXTMENU_TYPES.divider,
  },
  {
    type: CONTEXTMENU_TYPES.copy,
    label: 'Copy',
  },
  {
    type: CONTEXTMENU_TYPES.cut,
    label: 'Cut',
  },
  {
    type: CONTEXTMENU_TYPES.paste,
    label: 'Paste',
  },
  {
    type: CONTEXTMENU_TYPES.divider,
  },
  {
    type: CONTEXTMENU_TYPES.delete,
    label: 'Delete',
  },
];

export const WIDGET_SCALE_LIMIT = {
  xMin: 0.3,
  yMin: 0.3,
  xMax: 10.0,
  yMax: 10.0,
};

export const WIDGET_EDITOR_SCALE_LIMIT = {
  min: 0.2,
  max: 3.5,
};

export const WIDGET_DESCRIPTIONS = {
  relationship7: 'Collaborative',
  relationship8: 'Conflicted',
  relationship9: 'Hostile',
  relationship10: 'Cut-off',
};
