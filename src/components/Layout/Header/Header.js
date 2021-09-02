import { Grid, makeStyles } from '@material-ui/core';
import AccountBox from './components/AccountBox';
import { Title } from 'components/form-components';
import { HEADER_HEIGHT, MAIN_BORDER, PROJECT_TITLE } from 'utils/constants/ui';
import { HEADER_MAP } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: HEADER_HEIGHT,
    borderBottom: MAIN_BORDER,
  },
  logo: {
    maxWidth: 300,
    display: 'flex',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      borderRight: MAIN_BORDER,
    },
  },
  header: {
    order: 2,
    paddingLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      order: 3,
      padding: theme.spacing(2, 4),
      borderTop: MAIN_BORDER,
    },
  },
  account: {
    order: 3,
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      order: 2,
    },
  },
}));

const Header = ({ type }) => {
  const classes = useStyles();
  const Header = HEADER_MAP[type];

  return (
    Header && (
      <Grid container className={classes.root}>
        <Grid item xs={10} sm={10} md={4} className={classes.logo}>
          <Title>{PROJECT_TITLE}</Title>
        </Grid>
        <Grid item xs={12} sm={12} md={6} className={classes.header}>
          <Header />
        </Grid>
        <Grid item xs={2} sm={2} md={2} className={classes.account}>
          <AccountBox />
        </Grid>
      </Grid>
    )
  );
};

export default Header;
