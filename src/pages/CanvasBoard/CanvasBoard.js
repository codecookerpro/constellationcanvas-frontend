import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WidgetEditor } from 'components';
import { getBoard } from 'actions';

export default function CanvasBoard() {
  const { index, figures, copiedFigure, selectedParticipant } = useSelector((state) => state.board);
  const userUUID = useSelector((state) => state.auth.profile.uuid);
  const dispatch = useDispatch();
  const filteredFigures = useMemo(
    () =>
      figures.filter((f) => {
        if (f.canvas !== index) {
          return false;
        }
        if (selectedParticipant && selectedParticipant !== f.creatorUUID) {
          return false;
        }
        if (!selectedParticipant && userUUID !== f.creatorUUID) {
          return false;
        }
        return true;
      }),
    [index, figures, selectedParticipant, userUUID]
  );

  // eslint-disable-next-line
  useEffect(() => dispatch(getBoard()), []);

  return <WidgetEditor figures={filteredFigures} copiedFigure={copiedFigure} />;
}
