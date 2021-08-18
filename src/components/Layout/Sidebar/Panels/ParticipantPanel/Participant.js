import { Box, makeStyles } from '@material-ui/core';
import Avatar from 'components/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '31px 18px 0px 18px',
  },
}));

export default function Participant({ name, active }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Avatar displayName={name} />
    </Box>
  );
}
