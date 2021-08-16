import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { setIndex } from 'actions/boards';
import { SIDEBAR_ITEMS } from 'components/Layout/constants';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  link: {
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
  active: {
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
    backgroundColor: '#eae6fe',
    textDecoration: 'unset',
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
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const canvases = SIDEBAR_ITEMS[0].children;

  return (
    <Box className={classes.root}>
      {canvases.map((canvas) => {
        const active = pathname.startsWith(canvas.path);

        return (
          <Link
            className={active ? classes.active : classes.link}
            key={canvas.title}
            href={canvas.path}
            onClick={(e) => {
              e.preventDefault();

              history.push(canvas.path);
              dispatch(setIndex(canvas.index));
            }}
          >
            {canvas.title}
            <ChevronRightIcon />
          </Link>
        );
      })}
    </Box>
  );
}
