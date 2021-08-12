import { Box, makeStyles } from '@material-ui/core';
import { Title, Input, Button, Label } from 'components/form-components';
import { PROJECT_TITLE } from 'constants/user-interface';

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
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '360px',
    margin: '0 0 100px',
    padding: '38px 46px 37px 47px',
    borderRadius: '15px',
    backgroundColor: '#fff',
  },
  title: {
    margin: '0 23px 38px',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.rectangle}>
        <Title className={classes.title}>{PROJECT_TITLE}</Title>

        <Label>Participant Code:</Label>
        <Input placeholder="Enter participant code..." />

        <Label>Screen Name:</Label>
        <Input placeholder="Enter a screen name..." />

        <Box className={classes.buttonWrapper}>
          <Button color="primary" variant="contained">
            SUBMIT
          </Button>
          <Button color="secondary" variant="contained" style={{ marginLeft: 16 }}>
            RESET
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
