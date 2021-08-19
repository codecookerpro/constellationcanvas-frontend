import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WidgetEditor } from 'components';
import { useParams } from 'react-router';
import { getBoard, switchCanvas } from 'actions';

export default function CanvasBoard() {
  const { index } = useParams();
  const { figures, copiedFigure, selectedParticipant } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const filteredFigures = useMemo(
    () => figures.filter((f) => f.canvas === parseInt(index) && (!selectedParticipant || selectedParticipant === f.creatorUUID)),
    [index, figures, selectedParticipant]
  );

  // eslint-disable-next-line
  useEffect(() => dispatch(switchCanvas(parseInt(index))), [index]);

  // eslint-disable-next-line
  useEffect(() => dispatch(getBoard()), []);

  return <WidgetEditor figures={filteredFigures} copiedFigure={copiedFigure} />;
}
