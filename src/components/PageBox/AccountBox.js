import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { generateAvatarName } from 'utils/helpers';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 9999,
    backgroundColor: '#624ad7',
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    marginLeft: 14,
    fontWeight: 500,
  },
  username: {
    color: '#a4a4a4',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  logout: {
    color: '#624ad7',
    fontSize: 13,
  },
});

export default function AccountBox(props) {
  const classes = useStyles();
  const { displayName } = props;

  return (
    <Box className={classes.root}>
      <Box className={classes.avatar}>
        <Typography>{generateAvatarName(displayName)}</Typography>
      </Box>
      <Box className={classes.info}>
        <Typography className={classes.username}>{displayName}</Typography>
        <Link className={classes.logout} href="/logout">
          Log out
        </Link>
      </Box>
    </Box>
  );
}

AccountBox.defaultProps = {
  displayName: '',
};

AccountBox.propTypes = {
  displayName: PropTypes.string,
};
