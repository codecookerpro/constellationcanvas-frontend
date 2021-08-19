import { Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Participant from './Participant';

const useStyles = makeStyles({
  root: {
    padding: '0px 40px 40px 40px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ParticipantPanel() {
  const participants = useSelector((state) => state.board.participants);
  const classes = useStyles();
  const calcItemPadding = (idx) => ({
    paddingLeft: idx % 2 ? 17 : 0,
    paddingRight: idx % 2 ? 0 : 17,
  });
  const handleParcipantClick = (uuid) => {
    alert(uuid);
  };

  return (
    <Grid container className={classes.root}>
      {participants.map(({ uuid, name }, idx) => (
        <Grid item xs={6} key={uuid} className={classes.item} style={calcItemPadding(idx)}>
          <Participant uuid={uuid} name={name} active={true} onClick={handleParcipantClick} />
        </Grid>
      ))}
    </Grid>
  );
}
