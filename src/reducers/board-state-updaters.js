import _ from 'lodash';

export const INITIAL_BOARD_STATE = Object.freeze({
  index: 0,
  participants: [],
  selectedParticipant: null,
  name: '',
  figures: [],
  uuid: null,
  copiedFigure: {
    id: null,
  },
});

export const setBoardUpdater = (state, { payload }) => ({
  ...state,
  ...payload,
});

export const setCanvasIndexUpdater = (state, { payload: index }) => ({
  ...state,
  index,
});

export const setCopiedFigureUpdater = (state, { payload: uuid }) => ({
  ...state,
  copiedFigure: state.figures.find((f) => f.uuid === uuid),
});

export const addFigureUpdater = (state, { payload }) => ({
  ...state,
  figures: [...state.figures, payload],
});

export const removeFigureUpdater = (state, { payload: uuid }) => ({
  ...state,
  figures: state.figures.filter((f) => f.uuid !== uuid),
});

export const setFigureUpdater = (state, { payload: figure }) => ({
  ...state,
  figures: state.figures.map((f) => (f.uuid === figure.uuid ? _.merge({}, f, figure) : f)),
});

export const setFigureHoveredUpdater = (state, { payload: figureId }) => ({
  ...state,
  figures: state.figures.map((f) => ({ ...f, hovered: f.uuid === figureId })),
});

export const setSelectedParticipantUpdater = (state, { payload: selectedParticipant }) => ({
  ...state,
  selectedParticipant,
});
