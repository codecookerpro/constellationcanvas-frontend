import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WidgetEditor } from 'components';
import Header from './Header';
import PageBox from 'components/PageBox';
import {
  setTopic,
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
} from 'actions/dashboards';

export default function Dashboard() {
  const current = useSelector(({ main }) => main[main.index]);
  const copiedWidget = useSelector(({ main }) => main.copiedWidget);

  const dispatch = useDispatch();

  return (
    <PageBox header={<Header topic={current.topic} setTopic={(topic) => dispatch(setTopic(topic))} />}>
      <WidgetEditor
        widgets={current.widgets}
        addWidget={(widget) => dispatch(addWidget(widget))}
        removeWidget={(id) => dispatch(removeWidget(id))}
        setWidgetTransform={({ id, transform }) => dispatch(setWidgetTransform({ id, transform }))}
        setWidgetData={({ id, data }) => dispatch(setWidgetData({ id, data }))}
        setWidgetHovered={(id) => dispatch(setWidgetHovered(id))}
        bringToFront={(id) => dispatch(bringToFront(id))}
        sendToBack={(id) => dispatch(sendToBack(id))}
        bringForward={({ id, forwardId }) => dispatch(bringForward({ id, forwardId }))}
        sendBackward={({ id, backwardId }) => dispatch(sendBackward({ id, backwardId }))}
        copiedWidget={copiedWidget}
        setCopiedWidget={(widget) => dispatch(setCopiedWidget(widget))}
      />
    </PageBox>
  );
}
