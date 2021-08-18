import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { generateAvatarName, generateAvatarColor } from 'utils/helpers';

const useStyles = makeStyles({
  root: (props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 9999,
    backgroundColor: props.backgroundColor,
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  }),
});

const Avatar = ({ displayName }) => {
  const classes = useStyles({ backgroundColor: generateAvatarColor(displayName) });

  return (
    <Box className={classes.root}>
      <Typography>{generateAvatarName(displayName)}</Typography>
    </Box>
  );
};

export default Avatar;
