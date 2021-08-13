import { useState, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import BorderColorIcon from '@material-ui/icons/BorderColorOutlined';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '1px 0',
  },
  input: {
    '& .Mui-disabled': {
      color: 'black',
    },
  },
  editing: {
    border: '1px solid #e5e5e5',
    padding: '0px 5px',
    margin: '0px -5px',
  },
}));

const EditField = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(props.value);
  const [editing, setEditing] = useState(false);
  const input = useRef();
  const button = useRef();

  const { handleChange } = props;

  const handleSubmit = () => {
    handleChange(value);
    setEditing(false);
  };

  const handleCancel = (e) => {
    if (e?.relatedTarget !== button.current) {
      setValue(props.value);
      setEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!editing) {
      setTimeout(() => {
        input.current.focus();
      }, 100);
      setEditing(true);
    } else {
      handleSubmit();
    }
  };

  return (
    <Box className={clsx(classes.root, editing && classes.editing)}>
      <InputBase
        inputRef={input}
        className={classes.input}
        disabled={!editing}
        value={value}
        onBlur={handleCancel}
        onKeyDown={handleKeyDown}
        onChange={handleValueChange}
      />
      <IconButton ref={button} onClick={handleClick}>
        {editing && <DoneIcon />}
        {!editing && <BorderColorIcon />}
      </IconButton>
    </Box>
  );
};

export default EditField;
