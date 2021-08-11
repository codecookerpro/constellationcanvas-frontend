import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
    backgroundColor: '#624ad7',
    padding: '9px 16px',
    borderRadius: 9999,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default function Logo() {
  const classes = useStyles();

  return <Typography className={classes.root}>CONSTELLATION CANVAS</Typography>;
}
