import { useMemo, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { WIDGET_IMG_BASE_URL } from 'constants/user-interface';
import { WIDGET_DESCRIPTIONS } from 'components/WidgetEditor/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 97,
    height: 127,
    display: 'flex',
    flexDirection: 'column',
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
  img: {
    maxWidth: '100%',
    maxHeight: '80%',
    backgroundColor: 'transparent',
  },
  desc: {
    fontSize: '12px',
    letterSpacing: '0.42px',
    color: '#9f9f9f',
    marginTop: 24,
  },
}));

const Widget = ({ group, type, imageType }) => {
  const classes = useStyles();
  const ref = useRef();
  const description = useMemo(() => WIDGET_DESCRIPTIONS?.[type], [type]);

  const onDragStart = (e) => {
    const rect = e.target.getBoundingClientRect();
    const data = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      type,
    };

    const dragImg = ref.current.cloneNode(true);
    dragImg.classList.add('widget-drag-image-template');
    dragImg.querySelector('#widget-desc')?.remove();
    document.querySelector('.widget-drag-image-template')?.remove();
    document.querySelector('body').appendChild(dragImg);
    e.dataTransfer.setDragImage(dragImg, data.offsetX, data.offsetY);
    e.dataTransfer.setData('application/constellation-widget', JSON.stringify(data));
  };

  return (
    <div onDragStart={onDragStart} draggable className={classes.root} ref={ref}>
      <img draggable={false} className={classes.img} src={`${WIDGET_IMG_BASE_URL}${group}/${type}.${imageType}`} alt={type} />
      {description && (
        <div className={classes.desc} id="widget-desc">
          {description}
        </div>
      )}
    </div>
  );
};

export default Widget;
