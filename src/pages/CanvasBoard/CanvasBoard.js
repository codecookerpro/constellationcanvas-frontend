import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WidgetEditor } from 'components';
import { getBoard, setSelectedParticipant } from 'actions';

export default function CanvasBoard() {
  const { index, figures, copiedFigure, selectedParticipant } = useSelector((state) => state.board);
  const userUUID = useSelector((state) => state.auth.profile.uuid);
  const dispatch = useDispatch();
  const filteredFigures = useMemo(
    () => figures.filter((f) => f.canvas === index && selectedParticipant === f.creatorUUID),
    [index, figures, selectedParticipant]
  );

  // eslint-disable-next-line
  useEffect(() => dispatch(getBoard()), []);

  // eslint-disable-next-line
  useEffect(() => selectedParticipant || dispatch(setSelectedParticipant(userUUID)), [userUUID, selectedParticipant]);

  return <WidgetEditor figures={filteredFigures} copiedFigure={copiedFigure} index={index} />;
}
