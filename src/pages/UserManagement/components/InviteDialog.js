import { withStyles } from '@material-ui/core/styles';
import MuiDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Title from 'components/form-components/Title';
import Button from 'components/form-components/Button';
import Input from 'components/form-components/Input';
import { Label } from 'components';

const Dialog = withStyles({
  paper: {
    borderRadius: 15,
    padding: '20px 45px',
    '& .MuiDialogTitle-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .MuiDialogContent-root': {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 0 20px 0',
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: 0.42,
      color: '#717171',
      '& > :not(:first-child)': {
        marginTop: 5,
      },
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'center',
    },
    '& .MuiDialogActions-spacing': {
      '& > :not(:first-child)': {
        marginLeft: 16,
      },
    },
  },
})(MuiDialog);

const InviteDialog = (props) => {
  const { title, open, handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Title>{title}</Title>
      </DialogTitle>
      <DialogContent>
        <Label>Email:</Label>
        <Input type="email" placeholder="Enter Email to send invite code to..." />
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
        <Button type="reset" color="secondary" variant="contained">
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteDialog;
