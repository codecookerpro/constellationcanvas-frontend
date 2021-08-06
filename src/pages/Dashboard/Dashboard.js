import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { Box, Container } from '@material-ui/core';
import { Sidebar, Header, WidgetEditor } from 'components';
import { APP_BAR_HEIGHT } from 'constants/user-interface';
import { createGlobalStyle } from 'styled-components/macro';
import ActionTypes from 'constants/action-types';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

export default function Dashboard() {
  const canvas = useSelector((state) => state.main.canvas);
  const currentIndex = useSelector((state) => state.main.currentIndex);
  const topic = canvas[currentIndex].topic;
  const copiedWidget = useSelector((state) => state.main.copiedWidget);

  const dispatch = useDispatch();

  const setTopic = (value) => {
    dispatch({
      type: ActionTypes.SET_TOPIC,
      payload: value,
    });
  };

  const setCopiedWidget = (widget) => {
    dispatch({
      type: ActionTypes.SET_COPIED_WIDGET,
      copiedWidget: widget,
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <GlobalStyle />
      <Header topic={topic} onChangeTopic={setTopic} />
      <Sidebar />
      <Box
        component="main"
        sx={{
          backgroundColor: 'white',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="xl" style={{ padding: 0, marginTop: APP_BAR_HEIGHT, height: `calc(100% - ${APP_BAR_HEIGHT}px)` }}>
          <WidgetEditor copiedWidget={copiedWidget} onSetCopiedWidget={setCopiedWidget} />
        </Container>
      </Box>
    </Box>
  );
}
