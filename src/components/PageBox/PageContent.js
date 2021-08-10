import { Box, Container } from '@material-ui/core';

import { APP_BAR_HEIGHT } from 'constants/user-interface';

export default function PageContent(props) {
  return (
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
        {props.content}
      </Container>
    </Box>
  );
}
