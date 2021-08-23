import _ from 'lodash';
import { toArray } from 'utils';

export const INITIAL_BOARD_STATE = Object.freeze({
  index: 0,
  participants: [],
  selectedParticipant: null,
  name: '',
  figures: [],
  uuid: null,
  copiedFigure: {
    uuid: null,
  },
  isBlockingMode: false,
});

export const setBoardUpdater = (state, { payload }) =>
  state.isBlockingMode
    ? state
    : {
        ...state,
        ...payload,
      };

export const setCanvasIndexUpdater = (state, { payload: index }) =>
  state.isBlockingMode
    ? state
    : {
        ...state,
        index,
      };

export const setCopiedFigureUpdater = (state, { payload: uuid }) =>
  state.isBlockingMode
    ? state
    : {
        ...state,
        copiedFigure: state.figures.find((f) => f.uuid === uuid),
      };

export const addFigureUpdater = (state, { payload }) =>
  state.isBlockingMode
    ? state
    : {
        ...state,
        figures: [...state.figures, ...toArray(payload)],
      };

export const removeFigureUpdater = (state, { payload: uuid }) =>
  state.isBlockingMode
    ? state
    : {
        ...state,
        figures: state.figures.filter((f) => (Array.isArray(uuid) ? !uuid.includes(f.uuid) : f.uuid !== uuid)),
      };

export const setFigureUpdater = (state, { payload: figure }) =>
  state.isBlockingMode
    ? state
    : {
        ...state,
        figures: state.figures.find((f) => f.uuid === figure.uuid)
          ? state.figures.map((f) => (f.uuid === figure.uuid ? _.merge({}, f, figure) : f))
          : state.figures.concat(figure),
      };

export const setFigureHoveredUpdater = (state, { payload: figureId }) =>
  state.isBlockingMode
    ? state
    : {
        ...state,
        figures: state.figures.map((f) => (state.isBlockingMode ? state : { ...f, hovered: f.uuid === figureId })),
      };

export const setSelectedParticipantUpdater = (state, { payload: selectedParticipant }) =>
  state.isBlockingMode
    ? state
    : {
        ...state,
        selectedParticipant,
      };

export const setBlockingModeUpdater = (state, { payload }) => ({
  ...state,
  isBlockingMode: payload,
});
