import { makeStyles } from '@material-ui/core/styles';

import { WIDGET_IMG_BASE_URL } from 'constants/user-interface';

const useStyles = makeStyles((theme) => ({
  widget: {
    width: 97,
    backgroundColor: 'transparent',
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

const Widget = ({ group, type, imageType }) => {
  const classes = useStyles();
  const src = `${WIDGET_IMG_BASE_URL}${group}/${type}.${imageType}`;

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
