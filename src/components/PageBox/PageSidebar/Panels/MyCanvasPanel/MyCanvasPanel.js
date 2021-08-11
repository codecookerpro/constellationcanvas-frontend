import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { CANVASES as canvases } from './constants';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  detail: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 16,
    height: 40,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.49,
    color: '#6c6c6e',
    '&:hover': {
      backgroundColor: '#eae6fe',
      textDecoration: 'unset',
    },
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.49,
    color: '#6c6c6e',
  },
});

export default function MyCanvasPanel() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {canvases.map((canvas) => {
        return (
          <Link className={classes.detail} key={canvas.title} href={canvas.path}>
            {canvas.title}
            <ChevronRightIcon />
          </Link>
        );
      })}
    </Box>
  );
}
