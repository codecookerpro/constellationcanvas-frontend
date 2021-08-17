import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WidgetEditor } from 'components';
import { useParams } from 'react-router';
import { switchCanvas } from 'actions';

export default function CanvasBoard() {
  const { figures, copiedFigure } = useSelector((state) => state.board);
  const { index } = useParams();
  const dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(() => dispatch(switchCanvas(parseInt(index))), [index]);

  return <WidgetEditor figures={figures} copiedFigure={copiedFigure} />;
}
