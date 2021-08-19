import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { generateAvatarName, generateAvatarColor } from 'utils/helpers';

const useStyles = makeStyles({
  root: (props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: props.boxSize,
    height: props.boxSize,
    borderRadius: 9999,
    backgroundColor: props.backgroundColor,
    color: 'white',
    fontSize: props.fontSize,
    textTransform: 'uppercase',
  }),
});

const Avatar = ({ displayName, boxSize = 50, fontSize = 16 }) => {
  const classes = useStyles({ boxSize, fontSize, backgroundColor: generateAvatarColor(displayName) });

  return <Box className={classes.root}>{generateAvatarName(displayName)}</Box>;
};

export default Avatar;
