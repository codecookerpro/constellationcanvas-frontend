import { CANVAS_STATES } from './constants';
import { getUniqueId, getMaxDepth, bringToFront, sendToBack } from './helper';

export const INITIAL_MAIN_STATE = Object.freeze({
  index: CANVAS_STATES.current, // current, first, second
  participants: [],
  [CANVAS_STATES.current]: {
    topic: '',
    widgets: [],
  },
  [CANVAS_STATES.futureState1]: {
    topic: '',
    widgets: [],
  },
  [CANVAS_STATES.futureState2]: {
    topic: '',
    widgets: [],
  },
  copiedWidget: {
    id: null,
  },
});

export const setBoardDetailUpdater = (state, { payload }) => ({
  ...state,
  participants: payload.participants,
  [state.index]: {
    widgets: payload.figures || [],
    topic: payload.name,
  },
});

export const setParticipantsUpdater = (state, { payload: participants }) => ({
  ...state,
  participants,
});

export const setIndexUpdater = (state, payload) => {
  const { index } = payload;

  return {
    ...state,
    index,
  };
};

export const setCopiedWidgetUpdater = (state, payload) => {
  const { widget } = payload;

  return {
    ...state,
    copiedWidget: widget,
  };
};

export const setTopicUpdater = (state, payload) => {
  const { topic } = payload;
  const { index } = state;

  return {
    ...state,
    [index]: {
      ...state[index],
      topic,
    },
  };
};

export const addWidgetUpdater = (state, payload) => {
  const { widget } = payload;
  const { index } = state;
  const canvas = state[index];

  return {
    ...state,
    [index]: {
      ...canvas,
      widgets: canvas.widgets.concat({
        ...widget,
        id: getUniqueId(),
        depth: getMaxDepth(canvas.widgets) + 1,
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
      widgets: canvas.widgets.filter((w) => w.id !== id),
    },
  };
};

export const setWidgetTransformUpdater = (state, payload) => {
  const { id, transform } = payload;
  const { index } = state;
  const canvas = state[index];
  state[index].widgets = canvas.widgets.map((w) => (w.id !== id ? w : { ...w, transform: { ...w.transform, ...transform } }));
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
      widgets: canvas.widgets.map((w) => (w.id !== id ? w : { ...w, data: { ...w.data, ...data } })),
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
      widgets: canvas.widgets.map((w) => ({
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
      widgets: bringToFront(canvas.widgets, id),
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
      widgets: sendToBack(canvas.widgets, id),
    },
  };
};

export const bringForwardUpdater = (state, payload) => {
  const { id, forwardId } = payload;
  const { index } = state;
  const canvas = state[index];
  const widget = canvas.widgets.find((w) => w.id === id);
  const fwidget = canvas.widgets.find((w) => w.id === forwardId);

  return {
    ...state,
    [index]: {
      ...canvas,
      widgets: canvas.widgets.map((w) => {
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
  const widget = canvas.widgets.find((w) => w.id === id);
  const bwidget = canvas.widgets.find((w) => w.id === backwardId);

  return {
    ...state,
    [index]: {
      ...canvas,
      widgets: canvas.widgets.map((w) => {
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
