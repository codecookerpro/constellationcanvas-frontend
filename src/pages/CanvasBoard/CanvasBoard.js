import React from 'react';
import { useSelector } from 'react-redux';
import { WidgetEditor } from 'components';
import useActions from './use-action';

export default function CanvasBoard() {
  const { figures: widgets, copiedWidget } = useSelector((state) => state.board);
  const actions = useActions();

  return <WidgetEditor {...actions} widgets={widgets} copiedWidget={copiedWidget} />;
}
