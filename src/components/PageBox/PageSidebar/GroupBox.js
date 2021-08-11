import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { MAIN_BORDER } from 'constants/user-interface';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 16,
    height: 60,
    borderBottom: MAIN_BORDER,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.56,
    textTransform: 'uppercase',
    color: '#624ad7',
    '&:hover': {
      backgroundColor: '#624ad7',
      color: 'white',
      textDecoration: 'unset',
    },
  },
  expand: {
    backgroundColor: '#eae6fe',
    color: '#624ad7',
    borderRadius: '8px',
  },
});

export default function GroupBox(props) {
  const classes = useStyles();
  const { title, path } = props;

  return (
    <Link className={classes.root} href={path}>
      {title}
      <ChevronRightIcon className={classes.expand} />
    </Link>
  );
}
