import FigureWidget from './widgets/FigureWidget';
import ObjectWidget from './widgets/ObjectWidget';
import ShapeWidget from './widgets/ShapeWidget';
import TextWidget from './widgets/TextWidget';
import RelationshipWidget from './widgets/RelationshipWidget';

export const DROP_EFFECT = 'move';
export const TRANS_TYPES = Object.freeze({
  rotate: 'rotate',
  drag: 'drag',
  resize: 'resize',
  land: 'land',
});

export const CONTEXTMENU_TYPES = {
  front: 'front',
  back: 'back',
  forward: 'forward',
  backward: 'backward',
  divider: 'divider',
  copy: 'copy',
  cut: 'cut',
  paste: 'paste',
  delete: 'delete',
};

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

export const WIDGET_GROUPS = Object.freeze({
  lego: 'Figures (Lego)',
  peg: 'Figures (Pegs)',
  chess: 'Figures (Chess)',
  animal: 'Figures (Animals)',
  emotion: 'Emotions',
  object: 'Objects',
  shape: 'Shapes',
  capacity: 'Capacity/Energy',
  arrow: 'Directional Arrows',
  text: 'Text Controls',
  relation: 'Relationships',
});

export const WIDGET_MAP = {
  [WIDGET_GROUPS.lego]: FigureWidget,
  [WIDGET_GROUPS.peg]: FigureWidget,
  [WIDGET_GROUPS.chess]: FigureWidget,
  [WIDGET_GROUPS.animal]: FigureWidget,
  [WIDGET_GROUPS.object]: ObjectWidget,
  [WIDGET_GROUPS.shape]: ShapeWidget,
  [WIDGET_GROUPS.ball]: FigureWidget,
  [WIDGET_GROUPS.arrow]: ObjectWidget,
  [WIDGET_GROUPS.text]: TextWidget,
  [WIDGET_GROUPS.relation]: RelationshipWidget,
};

export const TEXT_WIDGET_PADDINGS = {
  text1: [0.09, 0.07, 0.09, 0.07],
  text2: [0.09, 0.07, 0.09, 0.07],
  text3: [0.19, 0.18, 0.19, 0.12],
  text4: [0.25, 0.17, 0.29, 0.26],
};

export const TEXT_WIDTH = 200;
export const TEXT_HEIGHT = 160;
export const TRANS_3D_X_POS = 1;
export const TRANS_3D_Y_POS = 3;
export const TRANS_3D_Z_POS = 5;
export const TRANS_2D_X_POS = 1;
export const TRANS_2D_Y_POS = 3;
export const TRANS_3D_TOKEN_NUM = 7;
export const TRANS_2D_TOKEN_NUM = 5;

export const WIDGET_TYPES = [
  {
    type: 'lego1',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego2',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego3',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego4',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego5',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego6',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego7',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego8',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego9',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego10',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego11',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego12',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego13',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego14',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego15',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego16',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego17',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego18',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego19',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego20',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego21',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego22',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego23',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego24',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego25',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego26',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego27',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego28',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego29',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego30',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego31',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'lego32',
    group: WIDGET_GROUPS.lego,
  },
  {
    type: 'peg1',
    group: WIDGET_GROUPS.peg,
  },
  {
    type: 'peg2',
    group: WIDGET_GROUPS.peg,
  },
  {
    type: 'peg3',
    group: WIDGET_GROUPS.peg,
  },
  {
    type: 'peg4',
    group: WIDGET_GROUPS.peg,
  },
  {
    type: 'peg5',
    group: WIDGET_GROUPS.peg,
  },
  {
    type: 'peg6',
    group: WIDGET_GROUPS.peg,
  },
  {
    type: 'chess1',
    group: WIDGET_GROUPS.chess,
  },
  {
    type: 'chess2',
    group: WIDGET_GROUPS.chess,
  },
  {
    type: 'chess3',
    group: WIDGET_GROUPS.chess,
  },
  {
    type: 'chess4',
    group: WIDGET_GROUPS.chess,
  },
  {
    type: 'chess5',
    group: WIDGET_GROUPS.chess,
  },
  {
    type: 'chess6',
    group: WIDGET_GROUPS.chess,
  },
  {
    type: 'animal1',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'animal2',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'animal3',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'animal4',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'animal5',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'animal6',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'animal7',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'animal8',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'animal9',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'animal10',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'animal11',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'animal12',
    group: WIDGET_GROUPS.animal,
  },
  {
    type: 'emotion1',
    group: WIDGET_GROUPS.emotion,
  },
  {
    type: 'emotion2',
    group: WIDGET_GROUPS.emotion,
  },
  {
    type: 'emotion3',
    group: WIDGET_GROUPS.emotion,
  },
  {
    type: 'emotion4',
    group: WIDGET_GROUPS.emotion,
  },
  {
    type: 'emotion5',
    group: WIDGET_GROUPS.emotion,
  },
  {
    type: 'emotion6',
    group: WIDGET_GROUPS.emotion,
  },
  {
    type: 'object1',
    group: WIDGET_GROUPS.object,
  },
  {
    type: 'object2',
    group: WIDGET_GROUPS.object,
  },
  {
    type: 'object3',
    group: WIDGET_GROUPS.object,
  },
  {
    type: 'object4',
    group: WIDGET_GROUPS.object,
  },
  {
    type: 'object5',
    group: WIDGET_GROUPS.object,
  },
  {
    type: 'object6',
    group: WIDGET_GROUPS.object,
  },
  {
    type: 'object7',
    group: WIDGET_GROUPS.object,
  },
  {
    type: 'object8',
    group: WIDGET_GROUPS.object,
  },
  {
    type: 'object9',
    group: WIDGET_GROUPS.object,
  },
  {
    type: 'object10',
    group: WIDGET_GROUPS.object,
  },
  {
    type: 'shape1',
    group: WIDGET_GROUPS.shape,
  },
  {
    type: 'shape2',
    group: WIDGET_GROUPS.shape,
  },
  {
    type: 'shape3',
    group: WIDGET_GROUPS.shape,
  },
  {
    type: 'shape4',
    group: WIDGET_GROUPS.shape,
  },
  {
    type: 'capacity1',
    group: WIDGET_GROUPS.capacity,
  },
  {
    type: 'capacity2',
    group: WIDGET_GROUPS.capacity,
  },
  {
    type: 'capacity3',
    group: WIDGET_GROUPS.capacity,
  },
  {
    type: 'capacity4',
    group: WIDGET_GROUPS.capacity,
  },
  {
    type: 'capacity5',
    group: WIDGET_GROUPS.capacity,
  },
  {
    type: 'arrow1',
    group: WIDGET_GROUPS.arrow,
  },
  {
    type: 'arrow2',
    group: WIDGET_GROUPS.arrow,
  },
  {
    type: 'arrow3',
    group: WIDGET_GROUPS.arrow,
  },
  {
    type: 'arrow4',
    group: WIDGET_GROUPS.arrow,
  },
  {
    type: 'arrow5',
    group: WIDGET_GROUPS.arrow,
  },
  {
    type: 'arrow6',
    group: WIDGET_GROUPS.arrow,
  },
  {
    type: 'text1',
    group: WIDGET_GROUPS.text,
  },
  {
    type: 'text2',
    group: WIDGET_GROUPS.text,
  },
  {
    type: 'text3',
    group: WIDGET_GROUPS.text,
  },
  {
    type: 'text4',
    group: WIDGET_GROUPS.text,
  },
  {
    type: 'relation1',
    group: WIDGET_GROUPS.relation,
  },
  {
    type: 'relation2',
    group: WIDGET_GROUPS.relation,
  },
  {
    type: 'relation3',
    group: WIDGET_GROUPS.relation,
  },
  {
    type: 'relation4',
    group: WIDGET_GROUPS.relation,
  },
  {
    type: 'relation5',
    group: WIDGET_GROUPS.relation,
  },
  {
    type: 'relation6',
    group: WIDGET_GROUPS.relation,
  },
];
