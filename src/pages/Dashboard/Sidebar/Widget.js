import { makeStyles } from '@material-ui/core/styles';

import { WIDGET_WIDTH, WIDGET_HEIGHT, WIDGET_IMG_BASE_URL } from '../constants';

const useStyles = makeStyles((theme) => ({
  widget: {
    width: WIDGET_WIDTH,
    height: WIDGET_HEIGHT,
    backgroundColor: '#f6f8fa',
    borderRadius: 8,
    padding: 8,
    '&:hover': {
      border: 2,
      borderStyle: 'solid',
      borderColor: '#f2a912',
      padding: 6,
    },
  },
}));

const Widget = (props) => {
  const classes = useStyles();
  const { type } = props;

  const src = `${WIDGET_IMG_BASE_URL}${type}.png`;

  const onDragStart = (e) => {
    const rect = e.target.getBoundingClientRect();
    const data = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      type,
    };

    const img = new Image();
    img.src = src;

    e.dataTransfer.setDragImage(img, data.offsetX, data.offsetY);
    e.dataTransfer.setData('application/constellation-widget', JSON.stringify(data));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div draggable onDragStart={onDragStart}>
      <img draggable={false} className={classes.widget} src={src} alt={type} />
    </div>
  );
};

export default Widget;
