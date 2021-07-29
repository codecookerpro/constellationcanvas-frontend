import React, { memo } from 'react';
import Human from './widgets/Human';
import { Grid } from '@material-ui/core';

const WidgetPanel = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Human />
      </Grid>
    </Grid>
  );
};

export default memo(WidgetPanel);
