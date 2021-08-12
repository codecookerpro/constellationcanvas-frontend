import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export default withStyles((theme) => ({
  root: {
    borderRadius: 5,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: '0.45px',
  },
}))(Button);
