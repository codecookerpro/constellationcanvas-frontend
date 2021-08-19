import { useState, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, makeStyles } from '@material-ui/core';
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const { uuid, name } = useSelector((state) => state.board);
  const [topic, setTopic] = useState(name);

  useEffect(() => setTopic(name), [name]);

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(updateBoard(uuid, { name: topic }));
    }
  };

  return (
    <Box className={classes.root}>
      <StyledLabel ml="36px">TOPIC:</StyledLabel>
      <StyledInput placeholder="Type the topic for the canvas…" value={topic} onChange={handleChange} onKeyDown={handleKeyDown} />
    </Box>
  );
};

export default memo(TopicHeader);
