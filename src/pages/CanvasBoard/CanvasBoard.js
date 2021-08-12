import React from 'react';
import { useSelector } from 'react-redux';
import { WidgetEditor } from 'components';
import useActions from './use-action';

export default function CanvasBoard() {
  const current = useSelector(({ main }) => main[main.index]);
  const copiedWidget = useSelector(({ main }) => main.copiedWidget);
  const actions = useActions();

  return <WidgetEditor {...actions} widgets={current.widgets} copiedWidget={copiedWidget} />;
}
