import { Box } from '@material-ui/core';
import { Title, Input, Button, Label } from 'components/form-components';
import { PROJECT_TITLE } from 'constants/user-interface';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { inviteToAccessToken } from 'actions/auth';
import useStyles from './use-styles';

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inviteCode, setInviteCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(inviteToAccessToken({ inviteCode }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInviteCode('');
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.rectangle}>
        <Title className={classes.title}>{PROJECT_TITLE}</Title>

        <Label>Participant Code:</Label>
        <Input placeholder="Enter participant code..." value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} />

        <Box className={classes.buttonWrapper}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            SUBMIT
          </Button>
          <Button color="secondary" variant="contained" style={{ marginLeft: 16 }} onClick={handleReset}>
            RESET
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
