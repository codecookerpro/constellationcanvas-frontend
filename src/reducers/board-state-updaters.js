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

export const setCopiedWidgetUpdater = (state, payload) => {
  const { widget } = payload;

  return {
    ...state,
    copiedWidget: widget,
  };
};

export const setBoard = (state, payload) => ({
  ...state,
  ...payload,
});

export const addWidgetUpdater = (state, payload) => {
  const { widget } = payload;
  const { index } = state;
  const canvas = state[index];

  return {
    ...state,
    [index]: {
      ...canvas,
      figures: canvas.figures.concat({
        ...widget,
        id: getUniqueId(),
        depth: getMaxDepth(canvas.figures) + 1,
      }),
    },
  };
};

export const removeWidgetUpdater = (state, payload) => {
  const { id } = payload;
  const { index } = state;
  const canvas = state[index];

  return {
    ...state,
    [index]: {
      ...canvas,
      figures: canvas.figures.filter((w) => w.id !== id),
    },
  };
};

export const setWidgetTransformUpdater = (state, payload) => {
  const { id, transform } = payload;
  const { index } = state;
  const canvas = state[index];
  state[index].figures = canvas.figures.map((w) => (w.id !== id ? w : { ...w, transform: { ...w.transform, ...transform } }));
  return state;
};

export const setWidgetDataUpdater = (state, payload) => {
  const { id, data } = payload;
  const { index } = state;
  const canvas = state[index];

  return {
    ...state,
    [index]: {
      ...canvas,
      figures: canvas.figures.map((w) => (w.id !== id ? w : { ...w, data: { ...w.data, ...data } })),
    },
  };
};

export const setWidgetHoveredUpdater = (state, payload) => {
  const { id } = payload;
  const { index } = state;
  const canvas = state[index];

  return {
    ...state,
    [index]: {
      ...canvas,
      figures: canvas.figures.map((w) => ({
        ...w,
        hovered: w.id === id,
      })),
    },
  };
};

export const bringToFrontUpdater = (state, payload) => {
  const { id } = payload;
  const { index } = state;
  const canvas = state[index];

  return {
    ...state,
    [index]: {
      ...canvas,
      figures: bringToFront(canvas.figures, id),
    },
  };
};

export const sendToBackUpdater = (state, payload) => {
  const { id } = payload;
  const { index } = state;
  const canvas = state[index];

  return {
    ...state,
    [index]: {
      ...canvas,
      figures: sendToBack(canvas.figures, id),
    },
  };
};

export const bringForwardUpdater = (state, payload) => {
  const { id, forwardId } = payload;
  const { index } = state;
  const canvas = state[index];
  const widget = canvas.figures.find((w) => w.id === id);
  const fwidget = canvas.figures.find((w) => w.id === forwardId);

  return {
    ...state,
    [index]: {
      ...canvas,
      figures: canvas.figures.map((w) => {
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
    },
  };
};

export const sendBackwardUpdater = (state, payload) => {
  const { id, backwardId } = payload;
  const { index } = state;
  const canvas = state[index];
  const widget = canvas.figures.find((w) => w.id === id);
  const bwidget = canvas.figures.find((w) => w.id === backwardId);

  return {
    ...state,
    [index]: {
      ...canvas,
      figures: canvas.figures.map((w) => {
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
    },
  };
};
