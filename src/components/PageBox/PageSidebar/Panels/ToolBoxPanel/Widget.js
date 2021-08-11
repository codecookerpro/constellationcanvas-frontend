import { makeStyles } from '@material-ui/core/styles';

import { WIDGET_IMG_BASE_URL } from 'constants/user-interface';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 97,
    height: 127,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 8,
    marginBottom: 30,
    '&:hover': {
      border: 2,
      borderStyle: 'solid',
      borderColor: '#f2a912',
      padding: 6,
    },
  },
  widget: {
    maxWidth: '90%',
    maxHeight: '90%',
    backgroundColor: 'transparent',
  },
}));

const Widget = ({ group, type, imageType }) => {
  const classes = useStyles();

  const onDragStart = (e) => {
    const rect = e.target.getBoundingClientRect();
    const data = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      type,
    };

    e.dataTransfer.setData('application/constellation-widget', JSON.stringify(data));
  };

  return (
    <div className={classes.root}>
      <img onDragStart={onDragStart} draggable className={classes.widget} src={`${WIDGET_IMG_BASE_URL}${group}/${type}.${imageType}`} alt={type} />
    </div>
  );
};

export default Widget;
