import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WidgetEditor } from 'components';
import { useParams } from 'react-router';
import { switchCanvas } from 'actions';

export default function CanvasBoard() {
  const { index } = useParams();
  const { figures, copiedFigure } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const filteredFigures = useMemo(() => figures.filter((f) => f.canvas === parseInt(index)), [index, figures]);

  // eslint-disable-next-line
  useEffect(() => dispatch(switchCanvas(parseInt(index))), [index]);

  return <WidgetEditor figures={filteredFigures} copiedFigure={copiedFigure} />;
}
