import { Box } from '@material-ui/core';
import { setLoading, updateOwnProfile } from 'actions';
import { Title, Input, Button, Label } from 'components/form-components';
import { PROJECT_TITLE } from 'constants/user-interface';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from './use-styles';

const SetScreenName = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [screenName, setScreenName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(updateOwnProfile({ name: screenName }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setScreenName('');
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.rectangle}>
        <Title className={classes.title}>{PROJECT_TITLE}</Title>

        <Label>Screen Name:</Label>
        <Input placeholder="Enter a screen name..." value={screenName} onChange={(e) => setScreenName(e.target.value)} />

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

export default SetScreenName;