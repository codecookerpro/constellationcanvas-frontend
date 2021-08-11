import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
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
});

const TextInput = (props) => {
  const classes = useStyles();

  return <input type="text" className={classes.root} {...props} />;
};

export default TextInput;
