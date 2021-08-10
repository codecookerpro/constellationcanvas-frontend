import { keyMirror } from 'utils';

import FigureWidget from './widgets/FigureWidget';
import ObjectWidget from './widgets/ObjectWidget';
import ShapeWidget from './widgets/ShapeWidget';
import TextWidget from './widgets/TextWidget';
import RelationshipWidget from './widgets/RelationshipWidget';
import CapacityWidget from './widgets/CapacityWidget';
import ArrowWidget from './widgets/ArrowWidget';
import EmotionWidget from './widgets/EmotionWidget';

export const DROP_EFFECT = 'move';
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
  { type: WIDGET_GROUP_TYPES.lego, label: 'Figures (Lego)', imageType: 'png', count: 32 },
  { type: WIDGET_GROUP_TYPES.peg, label: 'Figures (Pegs)', imageType: 'png', count: 6 },
  { type: WIDGET_GROUP_TYPES.chess, label: 'Figures (Chess)', imageType: 'png', count: 6 },
  { type: WIDGET_GROUP_TYPES.animal, label: 'Figures (Animals)', imageType: 'png', count: 12 },
  { type: WIDGET_GROUP_TYPES.emotion, label: 'Emotions', imageType: 'png', count: 6 },
  { type: WIDGET_GROUP_TYPES.object, label: 'Objects', imageType: 'png', count: 10 },
  { type: WIDGET_GROUP_TYPES.shape, label: 'Shapes', imageType: 'svg', count: 4 },
  { type: WIDGET_GROUP_TYPES.capacity, label: 'Capacity/Energy', imageType: 'png', count: 5 },
  { type: WIDGET_GROUP_TYPES.arrow, label: 'Directional Arrows', imageType: 'svg', count: 6 },
  { type: WIDGET_GROUP_TYPES.text, label: 'Text Controls', imageType: 'svg', count: 4 },
  { type: WIDGET_GROUP_TYPES.relationship, label: 'Relationships', imageType: 'svg', count: 6 },
];

export const WIDGET_MAP = {
  [WIDGET_GROUP_TYPES.lego]: FigureWidget,
  [WIDGET_GROUP_TYPES.peg]: FigureWidget,
  [WIDGET_GROUP_TYPES.chess]: FigureWidget,
  [WIDGET_GROUP_TYPES.animal]: FigureWidget,
  [WIDGET_GROUP_TYPES.emotion]: EmotionWidget,
  [WIDGET_GROUP_TYPES.object]: ObjectWidget,
  [WIDGET_GROUP_TYPES.shape]: ShapeWidget,
  [WIDGET_GROUP_TYPES.capacity]: CapacityWidget,
  [WIDGET_GROUP_TYPES.arrow]: ArrowWidget,
  [WIDGET_GROUP_TYPES.text]: TextWidget,
  [WIDGET_GROUP_TYPES.relationship]: RelationshipWidget,
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
