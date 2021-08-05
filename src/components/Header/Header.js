import { StyledLabel, StyledInput, StyledAppBar } from './styled-components';

const Header = () => (
  <StyledAppBar position="absolute" open={true}>
    <StyledLabel ml="36px">TOPIC:</StyledLabel>
    <StyledInput placeholder="Type the topic for the canvas…" />
  </StyledAppBar>
);

export default Header;
