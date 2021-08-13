import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
  },
  rectangle: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '360px',
    margin: '0 0 100px',
    padding: '38px 46px 37px 47px',
    borderRadius: '15px',
    backgroundColor: '#fff',
  },
  title: {
    margin: '0 23px 38px',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
}));
