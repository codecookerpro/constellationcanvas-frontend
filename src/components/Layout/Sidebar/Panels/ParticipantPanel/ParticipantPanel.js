import { Grid, makeStyles } from '@material-ui/core';
import { setSelectedParticipant } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LINKS } from 'utils/constants';
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
  const participants = useSelector((state) => state.auth.users);
  const selectedParticipant = useSelector((state) => state.board.selectedParticipant);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const calcItemPadding = (idx) => ({
    paddingLeft: idx % 2 ? 17 : 0,
    paddingRight: idx % 2 ? 0 : 17,
  });

  const handleParcipantClick = (uuid) => {
    history.push(LINKS.board);
    dispatch(setSelectedParticipant(uuid));
  };

  return (
    <Grid container className={classes.root}>
      {participants.map(({ uuid, name }, idx) => (
        <Grid item xs={6} key={uuid} className={classes.item} style={calcItemPadding(idx)}>
          <Participant uuid={uuid} name={name} active={uuid === selectedParticipant} onClick={handleParcipantClick} />
        </Grid>
      ))}
    </Grid>
  );
}
