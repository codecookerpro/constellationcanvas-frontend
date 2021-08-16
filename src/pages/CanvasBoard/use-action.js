import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  setIndex,
  setCopiedWidget,
  addWidget,
  removeWidget,
  setWidgetTransform,
  setWidgetData,
  setWidgetHovered,
  bringToFront,
  sendToBack,
  bringForward,
  sendBackward,
} from 'actions/boards';
import LINKS from 'constants/links';
import { CANVAS_STATES } from 'reducers/constants';

const useActions = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const key = Object.keys(LINKS).find((key) => pathname.startsWith(LINKS[key]));
    if (key) {
      dispatch(setIndex(CANVAS_STATES[key]));
    }
  }, [dispatch, pathname]);

  return {
    addWidget: (widget) => dispatch(addWidget(widget)),
    removeWidget: (id) => dispatch(removeWidget(id)),
    setWidgetTransform: ({ id, transform }) => dispatch(setWidgetTransform({ id, transform })),
    setWidgetData: ({ id, data }) => dispatch(setWidgetData({ id, data })),
    setWidgetHovered: (id) => dispatch(setWidgetHovered(id)),
    bringToFront: (id) => dispatch(bringToFront(id)),
    sendToBack: (id) => dispatch(sendToBack(id)),
    bringForward: ({ id, forwardId }) => dispatch(bringForward({ id, forwardId })),
    sendBackward: ({ id, backwardId }) => dispatch(sendBackward({ id, backwardId })),
    setCopiedWidget: (widget) => dispatch(setCopiedWidget(widget)),
  };
};

export default useActions;
