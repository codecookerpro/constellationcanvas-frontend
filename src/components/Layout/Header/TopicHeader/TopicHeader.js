import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { StyledLabel, StyledInput } from './styled-components';

import { updateBoard } from 'actions/boards';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#6c6c6e',
    fontSize: '26px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
}));

const TopicHeader = () => {
  const classes = useStyles();
  const topic = useSelector(({ main }) => main[main.index].topic);
  const [value, setValue] = useState(topic);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(updateBoard({ name: e.target.value }));
    }
  };

  return (
    <Box className={classes.root}>
      <StyledLabel ml="36px">TOPIC:</StyledLabel>
      <StyledInput placeholder="Type the topic for the canvas…" value={value} onChange={handleChange} onKeyDown={handleKeyDown} />
    </Box>
  );
};

export default memo(TopicHeader);
