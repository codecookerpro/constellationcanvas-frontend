import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { Avatar } from 'components/';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
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

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Box className={classes.root}>
      <Avatar displayName={displayName} />
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
