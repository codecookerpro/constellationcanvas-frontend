import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Participant from './Participant';

export default function ParticipantPanel() {
  const participants = useSelector((state) => state.board.participants);

  return (
    <Grid container spacing={4}>
      {participants.map(({ name }, idx) => (
        <Grid item xs={6} key={idx}>
          <Participant name={name} active={false} />
        </Grid>
      ))}
    </Grid>
  );
}
