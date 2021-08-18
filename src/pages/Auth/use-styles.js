import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
  },
  rectangle: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '360px',
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
  copyright: {
    position: 'absolute',
    top: 'calc(100vh - 28px)',
    fontSize: '13px',
    letterSpacing: '0.45px',
    textAlign: 'center',
    color: '#fff',
  },
}));
