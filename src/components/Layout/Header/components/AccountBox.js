import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { Avatar } from 'components/';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    marginLeft: 14,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  username: {
    color: '#a4a4a4',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  logout: {
    color: '#624ad7',
    fontSize: 13,
    cursor: 'pointer',
  },
}));

export default function AccountBox() {
  const classes = useStyles();
  const { profile } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Box className={classes.root}>
      <Avatar displayName={profile.name} />
      <Box className={classes.info}>
        <Typography className={classes.username}>{profile.name}</Typography>
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
