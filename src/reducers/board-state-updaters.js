import { CANVAS_STATES } from './constants';
import { getUniqueId, getMaxDepth, bringToFront, sendToBack } from './helper';

export const INITIAL_BOARD_STATE = Object.freeze({
  index: CANVAS_STATES.current,
  participants: [],
  name: '',
  figures: [],
  uuid: null,
  copiedWidget: {
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

export const setCopiedWidgetUpdater = (state, { payload: widget }) => ({
  ...state,
  copiedWidget: widget,
});

export const setBoard = (state, payload) => ({
  ...state,
  ...payload,
});

export const addWidgetUpdater = (state, { payload }) => ({
  ...state,
  figures: state.figures.concat({
    ...payload,
    id: getUniqueId(),
    depth: getMaxDepth(state.figures) + 1,
  }),
});

export const removeWidgetUpdater = (state, { payload: id }) => ({
  ...state,
  figures: state.figures.filter((w) => w.id !== id),
});

export const setWidgetTransformUpdater = (state, { payload: { id, transform } }) => ({
  ...state,
  figures: state.figures.map((w) => (w.id !== id ? w : { ...w, transform: { ...w.transform, ...transform } })),
});

export const setWidgetDataUpdater = (state, { payload: { id, data } }) => ({
  ...state,
  figures: state.figures.map((w) => (w.id !== id ? w : { ...w, data: { ...w.data, ...data } })),
});

export const setWidgetHoveredUpdater = (state, { payload: id }) => ({
  ...state,
  figures: state.figures.map((w) => ({
    ...w,
    hovered: w.id === id,
  })),
});

export const bringToFrontUpdater = (state, { payload: id }) => ({
  ...state,
  figures: bringToFront(state.figures, id),
});

export const sendToBackUpdater = (state, { payload: id }) => ({
  ...state,
  figures: sendToBack(state.figures, id),
});

export const bringForwardUpdater = (state, payload) => {
  const { id, forwardId } = payload;
  const widget = state.figures.find((w) => w.id === id);
  const fwidget = state.figures.find((w) => w.id === forwardId);

  return {
    ...state,
    figures: state.figures.map((w) => {
      if (w.id === id) {
        return {
          ...w,
          depth: fwidget.depth,
        };
      }

      if (w.id === forwardId) {
        return {
          ...w,
          depth: widget.depth,
        };
      }

      return w;
    }),
  };
};

export const sendBackwardUpdater = (state, payload) => {
  const { id, backwardId } = payload;
  const widget = state.figures.find((w) => w.id === id);
  const bwidget = state.figures.find((w) => w.id === backwardId);

  return {
    ...state,
    figures: state.figures.map((w) => {
      if (w.id === id) {
        return {
          ...w,
          depth: bwidget.depth,
        };
      }

      if (w.id === backwardId) {
        return {
          ...w,
          depth: widget.depth,
        };
      }

      return w;
    }),
  };
};
