import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { generateAvatarName } from 'utils/helpers';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'actions';
import { USER_ROLES } from 'constants/enums';

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

export default function AccountBox({ displayName }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(setUserInfo('', { role: USER_ROLES.unknown }));
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.avatar}>
        <Typography>{generateAvatarName(displayName)}</Typography>
      </Box>
      <Box className={classes.info}>
        <Typography className={classes.username}>{displayName}</Typography>
        <Link className={classes.logout} onClick={handleLogout}>
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
