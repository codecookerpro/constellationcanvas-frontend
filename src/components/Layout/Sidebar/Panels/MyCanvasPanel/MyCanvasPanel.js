import { makeStyles } from '@material-ui/core/styles';
import { Box, Link } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { SIDEBAR_ITEMS } from 'components/Layout/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedParticipant, switchCanvas } from 'actions';

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
  const dispatch = useDispatch();
  const index = useSelector((state) => state.board.index);
  const { selectedParticipant } = useSelector((state) => state.board);
  const canvases = SIDEBAR_ITEMS[0].children;

  const handleClick = (e, idx) => {
    e.preventDefault();
    dispatch(setSelectedParticipant(null));
    dispatch(switchCanvas(idx));
  };

  return (
    <Box className={classes.root}>
      {canvases.map((canvas, idx) => (
        <Link
          className={!selectedParticipant && idx === index ? classes.active : classes.link}
          key={canvas.title}
          onClick={(e) => handleClick(e, idx)}
        >
          {canvas.title}
          <ChevronRightIcon />
        </Link>
      ))}
    </Box>
  );
}
