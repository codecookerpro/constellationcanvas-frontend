import { Box } from '@material-ui/core';
import { updateUser } from 'actions';
import { Title, Input, Button, Label } from 'components/form-components';
import { PROJECT_TITLE } from 'constants/ui';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './use-styles';

const SetScreenName = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [screenName, setScreenName] = useState('');
  const userUUID = useSelector((state) => state.auth.profile.uuid);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userUUID, { name: screenName }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setScreenName('');
  };

  return (
    <Box className={classes.root}>
      <form className={classes.rectangle} onSubmit={handleSubmit}>
        <Title className={classes.title}>{PROJECT_TITLE}</Title>

        <Label>Screen Name:</Label>
        <Input placeholder="Enter a screen name..." value={screenName} onChange={(e) => setScreenName(e.target.value)} required autoFocus />

        <Box className={classes.buttonWrapper}>
          <Button type="submit" color="primary" variant="contained" onClick={handleSubmit}>
            SUBMIT
          </Button>
          <Button color="secondary" variant="contained" style={{ marginLeft: 16 }} onClick={handleReset}>
            RESET
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SetScreenName;
