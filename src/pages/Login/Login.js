import { Box, makeStyles } from '@material-ui/core';
import { Input, Button, Label } from 'components/form-components';
import { LOGO_URL } from 'constants/user-interface';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
  },
  rectangle: {
    width: '360px',
    height: '361px',
    margin: '0 0 100px',
    padding: '38px 46px 37px 47px',
    borderRadius: '15px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  logo: {
    width: '221px',
    height: '35px',
    margin: '0 23px 38px',
    objectFit: 'contain',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.rectangle}>
        <img src={LOGO_URL} className={classes.logo} alt="logo" />

        <Label>Participant Code:</Label>
        <Input placeholder="Enter participant code..." />

        <Label>Screen Name:</Label>
        <Input placeholder="Enter a screen name..." />

        <Box className={classes.buttonWrapper}>
          <Button color="primary" variant="contained">
            SUBMIT
          </Button>
          <Button color="secondary" variant="contained" style={{ marginLeft: 4 }}>
            RESET
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
