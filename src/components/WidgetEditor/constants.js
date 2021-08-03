import FigureWidget from './widgets/FigureWidget';
import ShapeWidget from './widgets/ShapeWidget';

export const DROP_EFFECT = 'move';
export const TRANS_TYPES = Object.freeze({
  rotate: 'rotate',
  drag: 'drag',
  resize: 'resize',
  land: 'land',
});

export const ORDER_TYPES = {
  front: 'front',
  back: 'back',
  forward: 'forward',
  backward: 'backward',
};

export const CONTEXTMENU_ITEMS = [
  {
    type: ORDER_TYPES.front,
    label: 'Bring to Front',
  },
  {
    type: ORDER_TYPES.back,
    label: 'Send to Back',
  },
  {
    type: ORDER_TYPES.forward,
    label: 'Bring Forward',
  },
  {
    type: ORDER_TYPES.backward,
    label: 'Send Backward',
  },
];

export const WIDGET_GROUPS = Object.freeze({
  lego: 'Figures (Lego)',
  peg: 'Figures (Pegs)',
  chess: 'Figures (Chess)',
  animal: 'Figures (Animals)',
  object: 'Objects',
  shape: 'Shapes',
  ball: 'Harvey Balls',
  arrow: 'Directional Arrows',
  text: 'Text Controls',
  relation: 'Relationships',
});

export const WIDGET_MAP = {
  [WIDGET_GROUPS.lego]: FigureWidget,
  [WIDGET_GROUPS.peg]: FigureWidget,
  [WIDGET_GROUPS.chess]: FigureWidget,
  [WIDGET_GROUPS.animal]: FigureWidget,
  [WIDGET_GROUPS.object]: FigureWidget,
  [WIDGET_GROUPS.shape]: ShapeWidget,
  [WIDGET_GROUPS.ball]: FigureWidget,
  [WIDGET_GROUPS.arrow]: FigureWidget,
  [WIDGET_GROUPS.text]: FigureWidget,
  [WIDGET_GROUPS.relation]: FigureWidget,
};

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
    type: 'ball1',
    group: WIDGET_GROUPS.ball,
  },
  {
    type: 'ball2',
    group: WIDGET_GROUPS.ball,
  },
  {
    type: 'ball3',
    group: WIDGET_GROUPS.ball,
  },
  {
    type: 'ball4',
    group: WIDGET_GROUPS.ball,
  },
  {
    type: 'ball5',
    group: WIDGET_GROUPS.ball,
  },
  {
    type: 'ball6',
    group: WIDGET_GROUPS.ball,
  },
  {
    type: 'ball7',
    group: WIDGET_GROUPS.ball,
  },
  {
    type: 'ball8',
    group: WIDGET_GROUPS.ball,
  },
  {
    type: 'ball9',
    group: WIDGET_GROUPS.ball,
  },
  {
    type: 'ball10',
    group: WIDGET_GROUPS.ball,
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
];
