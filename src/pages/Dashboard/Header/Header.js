import { useState } from 'react';
import { StyledLabel, StyledInput } from './styled-components';
import { makeStyles } from '@material-ui/core';

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

const Header = ({ topic, setTopic }) => {
  const classes = useStyles();
  const [value, setValue] = useState(topic);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setTopic(e.target.value);
    }
  };

  return (
    <div className={classes.root}>
      <StyledLabel ml="36px">TOPIC:</StyledLabel>
      <StyledInput placeholder="Type the topic for the canvas…" value={value} onChange={handleChange} onKeyDown={handleKeyDown} />
    </div>
  );
};

export default Header;
