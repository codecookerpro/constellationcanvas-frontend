import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#624ad7',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 50,
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant="h1" component="h1">
      ADMINISTRATION CONTROL PANEL
    </Typography>
  );
}
