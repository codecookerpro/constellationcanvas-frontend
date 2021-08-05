import AppBar from '@material-ui/core/AppBar';
import styledComponent from 'styled-components';
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { DRAWER_WIDTH, APP_BAR_HEIGHT, MAIN_BORDER } from 'constants/user-interface';

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'white',
  color: '#6c6c6e',
  fontSize: '26px',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  boxShadow: 'none',
  borderBottom: MAIN_BORDER,
  height: APP_BAR_HEIGHT,
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const StyledLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '120px',
}));

export const StyledInput = styledComponent.input`
  ::-webkit-input-placeholder {
      font-style: italic;
      font-size: 22px;
      font-weight: 300;
      letter-spacing: 0.76px;
      color: #cacaca;
  }
  :focus {
      outline: none;
  }
  font-size: 22px;
  font-weight: 300;
  height: 23px;
  width: 100%;
  border: none;
`;
