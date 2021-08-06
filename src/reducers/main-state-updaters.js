export const INITIAL_MAIN_STATE = Object.freeze({
  canvas: [
    {
      topic: 'Current State',
      widgets: [],
    },
    {
      topic: 'Future State 1',
      widgets: [],
    },
    {
      topic: 'Future State 2',
      widgets: [],
    },
  ],
  currentIndex: 0,
  copiedWidget: {
    id: null,
  },
});

export const setCopiedWidget = (state, { copiedWidget }) => {
  return {
    ...state,
    copiedWidget,
  };
};

export const setTopic = (state, { topic }) => {
  let canvas = state.canvas;

  canvas[state.currenIndex] = {
    ...canvas[state.currenIndex],
    topic,
  };

  return {
    ...state,
    canvas,
  };
};
