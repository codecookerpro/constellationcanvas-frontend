import { makeStyles } from '@material-ui/core';
import { UI_COLORS } from 'constants/user-interface';

const useStyles = makeStyles({
  root: {
    padding: '10px 28px 10px 29px',
    borderRadius: '5px',
    backgroundColor: (props) => props.color,
  },
});

const Button = (props) => {
  const classes = useStyles({ color: props.color || UI_COLORS.lightIndigo });

  return (
    <button className={classes.root} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
