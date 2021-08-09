import { Box, Button, makeStyles } from '@material-ui/core';
import { PageBox } from 'components';
import { FONT_FAMILY, LOGO_URL, UI_COLORS } from 'constants/user-interface';

const useStyles = makeStyles({
  root: {
    backgroundColor: UI_COLORS.lightIndigo,
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangle: {
    width: '360px',
    height: '361px',
    margin: '0 0 100px',
    padding: '38px 46px 37px 47px',
    borderRadius: '15px',
    backgroundColor: UI_COLORS.white,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  logo: {
    width: '221px',
    height: '35px',
    margin: '0 23px 38px',
    objectFit: 'contain',
  },
  participantLabel: {
    width: '104px',
    height: '15px',
    fontFamily: FONT_FAMILY,
    fontSize: '12px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.42px',
    color: '#717171',
  },
  participantInput: {
    width: '267px',
    height: '40px',
    margin: '6px 0 19px',
    padding: '12px 9px 12px 9px',
    borderRadius: '5px',
    boxShadow: 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    border: 'solid 1px #d5d5d5',
    '&::-webkit-input-placeholder': {
      fontStyle: 'italic',
      fontSize: '14px',
      fontWeight: '300',
      letterSpacing: '0.76px',
      color: '#cacaca',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const Login = () => {
  const classes = useStyles();

  return (
    <PageBox className={classes.root}>
      <Box className={classes.rectangle}>
        <img src={LOGO_URL} className={classes.logo} alt="logo" />
        <span className={classes.participantLabel}>Participant Code:</span>
        <input type="text" className={classes.participantInput} placeholder="Enter participant code..." />
        <span className={classes.participantLabel}>Screen Name:</span>
        <input type="text" className={classes.participantInput} placeholder="Enter a screen name..." />
        <Box className={classes.buttonWrapper}>
          <Button color="primary" variant="contained">
            SUBMIT
          </Button>
          <Button color="secondary" variant="contained">
            RESET
          </Button>
        </Box>
      </Box>
    </PageBox>
  );
};

export default Login;
