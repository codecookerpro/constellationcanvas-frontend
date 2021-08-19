import { makeStyles } from '@material-ui/core/styles';
import { Box, Link } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { SIDEBAR_ITEMS } from 'components/Layout/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedParticipant, switchCanvas } from 'actions';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { LINKS } from 'utils/constants';

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
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#dab6fe',
      textDecoration: 'unset',
    },
    '&.active': {
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
  const history = useHistory();
  const index = useSelector((state) => state.board.index);
  const { selectedParticipant } = useSelector((state) => state.board);
  const canvases = SIDEBAR_ITEMS[0].children;

  const handleClick = (e, idx) => {
    e.preventDefault();

    history.push(LINKS.board);
    dispatch(setSelectedParticipant(null));
    dispatch(switchCanvas(idx));
  };

  return (
    <Box className={classes.root}>
      {canvases.map((canvas, idx) => (
        <Link
          className={clsx(classes.link, { active: !selectedParticipant && idx === index && history.location.pathname === LINKS.board })}
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
