import { makeStyles } from '@material-ui/core';
import { APP_BAR_HEIGHT } from 'constants/user-interface';

export default makeStyles((theme) => ({
  sidebar: {
    maxHeight: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
    overflowX: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 4,
    },
  },
  group: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.56,
    color: '#624ad7',
  },
  subGroup: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6c6c6e',
  },
  expand: {
    backgroundColor: '#eae6fe',
    color: '#624ad7',
    borderRadius: '8px',
  },
  detail: {
    width: '-webkit-fill-available',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 40,
    padding: `10px 18px 10px 0px`,
    backgroundColor: '#E8DAEF',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.49,
    paddingLeft: 40,
    color: '#6c6c6e',
  },
}));
