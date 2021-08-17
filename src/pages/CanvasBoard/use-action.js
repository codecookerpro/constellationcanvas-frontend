import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  switchCanvas,
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

const useActions = () => {
  const dispatch = useDispatch();
  const { index } = useParams();

  // eslint-disable-next-line
  useEffect(() => dispatch(switchCanvas(parseInt(index))), [index]);

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
