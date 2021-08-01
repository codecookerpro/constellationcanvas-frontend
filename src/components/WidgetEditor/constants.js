import FigureWidget from './widgets/FigureWidget';

export const DROP_EFFECT = 'move';
export const TRANS_TYPES = Object.freeze({
  rotate: 'rotate',
  drag: 'drag',
  resize: 'resize',
  land: 'land',
});

export const ORDER_TYPE = {
  front: 0,
  back: 1,
  forward: 2,
  backward: 3,
};

export const WIDGET_GROUPS = Object.freeze({
  lego: 'Figures (Lego)',
  chessWhite: 'Figures (Chess White)',
  chessBlack: 'Figures (Chess Black)',
  animals: 'Figures (Animals)',
  objects: 'Objects',
  shapes: 'Shapse',
  emotions: 'Emotions',
});

export const WIDGET_MAP = {
  [WIDGET_GROUPS.lego]: FigureWidget,
  [WIDGET_GROUPS.chessWhite]: FigureWidget,
  [WIDGET_GROUPS.chessBlack]: FigureWidget,
  [WIDGET_GROUPS.animals]: FigureWidget,
  [WIDGET_GROUPS.objects]: FigureWidget,
  [WIDGET_GROUPS.shapes]: FigureWidget,
  [WIDGET_GROUPS.emotions]: FigureWidget,
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
    type: 'chess_white_1',
    group: WIDGET_GROUPS.chessWhite,
  },
  {
    type: 'chess_white_2',
    group: WIDGET_GROUPS.chessWhite,
  },
  {
    type: 'chess_white_3',
    group: WIDGET_GROUPS.chessWhite,
  },
  {
    type: 'chess_white_4',
    group: WIDGET_GROUPS.chessWhite,
  },
  {
    type: 'chess_white_5',
    group: WIDGET_GROUPS.chessWhite,
  },
  {
    type: 'chess_white_6',
    group: WIDGET_GROUPS.chessWhite,
  },
  {
    type: 'chess_black_1',
    group: WIDGET_GROUPS.chessBlack,
  },
  {
    type: 'chess_black_2',
    group: WIDGET_GROUPS.chessBlack,
  },
  {
    type: 'chess_black_3',
    group: WIDGET_GROUPS.chessBlack,
  },
  {
    type: 'chess_black_4',
    group: WIDGET_GROUPS.chessBlack,
  },
  {
    type: 'chess_black_5',
    group: WIDGET_GROUPS.chessBlack,
  },
  {
    type: 'chess_black_6',
    group: WIDGET_GROUPS.chessBlack,
  },
  {
    type: 'animal1',
    group: WIDGET_GROUPS.animals,
  },
  {
    type: 'animal2',
    group: WIDGET_GROUPS.animals,
  },
  {
    type: 'animal3',
    group: WIDGET_GROUPS.animals,
  },
  {
    type: 'animal4',
    group: WIDGET_GROUPS.animals,
  },
  {
    type: 'animal5',
    group: WIDGET_GROUPS.animals,
  },
  {
    type: 'animal6',
    group: WIDGET_GROUPS.animals,
  },
  {
    type: 'animal7',
    group: WIDGET_GROUPS.animals,
  },
  {
    type: 'animal8',
    group: WIDGET_GROUPS.animals,
  },
  {
    type: 'object1',
    group: WIDGET_GROUPS.objects,
  },
  {
    type: 'object2',
    group: WIDGET_GROUPS.objects,
  },
  {
    type: 'object3',
    group: WIDGET_GROUPS.objects,
  },
  {
    type: 'object4',
    group: WIDGET_GROUPS.objects,
  },
  {
    type: 'object5',
    group: WIDGET_GROUPS.objects,
  },
  {
    type: 'object6',
    group: WIDGET_GROUPS.objects,
  },
  {
    type: 'object7',
    group: WIDGET_GROUPS.objects,
  },
  {
    type: 'object8',
    group: WIDGET_GROUPS.objects,
  },
  {
    type: 'shape1',
    group: WIDGET_GROUPS.shapes,
  },
  {
    type: 'shape2',
    group: WIDGET_GROUPS.shapes,
  },
  {
    type: 'shape3',
    group: WIDGET_GROUPS.shapes,
  },
  {
    type: 'shape4',
    group: WIDGET_GROUPS.shapes,
  },
  {
    type: 'emotion1',
    group: WIDGET_GROUPS.emotions,
  },
  {
    type: 'emotion2',
    group: WIDGET_GROUPS.emotions,
  },
  {
    type: 'emotion3',
    group: WIDGET_GROUPS.emotions,
  },
  {
    type: 'emotion4',
    group: WIDGET_GROUPS.emotions,
  },
  {
    type: 'emotion5',
    group: WIDGET_GROUPS.emotions,
  },
  {
    type: 'emotion6',
    group: WIDGET_GROUPS.emotions,
  },
];
