import { CANVAS_STATES } from './constants';
import { getUniqueId, getMaxDepth, bringToFront, sendToBack } from './helper';

export const INITIAL_MAIN_STATE = Object.freeze({
  index: CANVAS_STATES.current, // current, first, second
  [CANVAS_STATES.current]: {
    topic: '',
    widgets: [
      {
        id: '0bd72455dc0d783e324660d2',
        type: 'text2',
        depth: 0,
        data: {
          text: 'By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.',
        },
        transform: {
          tx: '911.75px',
          ty: '229px',
          rotate: '0deg',
          sx: 1.75333,
          sy: 1.37333,
        },
      },
      {
        id: '0bd730dcdc0d783e324660d4',
        type: 'lego6',
        depth: 2,
        data: {},
        transform: {
          tx: '232.75px',
          ty: '362px',
          rotate: '0deg',
          sx: 1,
          sy: 1,
        },
      },
      {
        type: 'arrow2',
        data: {},
        transform: {
          tx: '176.75px',
          ty: '556px',
          rotate: '0deg',
          sx: 1,
          sy: 1,
        },
        id: '2cd46232256b18b3c0228d63',
        depth: 4,
      },
      {
        type: 'peg2',
        data: {},
        transform: {
          tx: '89.75px',
          ty: '159px',
          rotate: '0deg',
          sx: 1,
          sy: 1,
        },
        id: '2cd47760256b18b3c0228d64',
        depth: 5,
      },
      {
        type: 'chess2',
        data: {},
        transform: {
          tx: '329.75px',
          ty: '145px',
          rotate: '0deg',
          sx: 1,
          sy: 1,
        },
        id: '2cd48500256b18b3c0228d65',
        depth: 6,
      },
      {
        type: 'animal2',
        data: {},
        transform: {
          tx: '660.75px',
          ty: '393px',
          rotate: '0deg',
          sx: 1,
          sy: 1,
        },
        id: '2cd49540256b18b3c0228d66',
        depth: 7,
      },
      {
        type: 'emotion1',
        data: {},
        transform: {
          tx: '554.25px',
          ty: '114px',
          rotate: '0deg',
          sx: 1,
          sy: 1,
        },
        id: '2cd4b858256b18b3c0228d67',
        depth: 8,
      },
      {
        type: 'object10',
        data: {},
        transform: {
          tx: '784.75px',
          ty: '67.125px',
          rotate: '0deg',
          sx: 1,
          sy: 1,
        },
        id: '2cd4d468256b18b3c0228d68',
        depth: 9,
      },
      {
        type: 'shape3',
        data: {},
        transform: {
          tx: '894.25px',
          ty: '526.531px',
          rotate: '0deg',
          sx: 1,
          sy: 1,
        },
        id: '2cd4eaa0256b18b3c0228d69',
        depth: 10,
        hovered: true,
      },
      {
        type: 'capacity3',
        data: {},
        transform: {
          tx: '408.25px',
          ty: '333.531px',
          rotate: '0deg',
          sx: 1,
          sy: 1,
        },
        id: '2cd4fde8256b18b3c0228d6a',
        depth: 11,
      },
      {
        type: 'relationship1',
        data: {},
        transform: {
          tx: '616.25px',
          ty: '638.172px',
          rotate: '0deg',
          sx: 2.475,
          sy: 1.73333,
        },
        id: '2cd54378256b18b3c0228d6b',
        depth: 12,
      },
    ],
  },
  [CANVAS_STATES.first]: {
    topic: '',
    widgets: [],
  },
  [CANVAS_STATES.second]: {
    topic: '',
    widgets: [],
  },
  copiedWidget: {
    id: null,
  },
});

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
