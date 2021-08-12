import { withStyles } from '@material-ui/core/styles';
import MuiTypography from '@material-ui/core/Typography';

const Typography = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#624ad7',
    padding: '9px 16px',
    borderRadius: 9999,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 14,
  },
})(MuiTypography);

export default function TitleBox({ title }) {
  return <Typography>{title}</Typography>;
}
