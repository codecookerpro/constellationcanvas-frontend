import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  title: {
    backgroundColor: '#624ad7',
    color: 'white',
    borderRadius: 9999,
    margin: 40,
    padding: '10px 30px',
    fontSize: 14,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function InviteDialog(props) {
  const classes = useStyles();
  const { open, handleClose } = props;

  return (
    <Dialog className={classes.root} open={open} onClose={handleClose}>
      <DialogTitle className={classes.title}>Invite Facilitator</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={handleClose} color="primary">
          SUBMIT
        </Button>
        <Button onClick={handleClose} color="secondary">
          RESET
        </Button>
      </DialogActions>
    </Dialog>
  );
}
