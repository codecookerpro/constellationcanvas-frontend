import { useState } from 'react';
import { StyledLabel, StyledInput, StyledAppBar } from './styled-components';

const Header = ({ topic, onChangeTopic }) => {
  const [value, setValue] = useState(topic);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onChangeTopic(e.target.value);
    }
  };

  return (
    <StyledAppBar position="absolute" open={true}>
      <StyledLabel ml="36px">TOPIC:</StyledLabel>
      <StyledInput placeholder="Type the topic for the canvas…" value={value} onChange={handleChange} onKeyDown={handleKeyDown} />
    </StyledAppBar>
  );
};

export default Header;
