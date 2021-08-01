import { memo, useRef } from 'react';
import FigureWidget from './FigureWidget';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  target: {
    width: '100px',
    height: '100px',
    lineHeight: '100px',
    textAlign: 'center',
    background: '#ee8',
    color: '#333',
    fontWeight: 'bold',
    border: '1px solid #333',
    boxSizing: 'border-box',
    '&.target1': {
      position: 'absolute',
      left: '0px',
      top: '0px',
    },
    '&.target2': {
      position: 'absolute',
      left: '130px',
      top: '30px',
    },
    '&.target3': {
      position: 'absolute',
      left: '80px',
      top: '130px',
    },
  },
});

export const transformer = (translate) => ({
  target1: [...translate, 0, 100, 100],
  target2: [...translate, 0, 100, 100],
  target3: [...translate, 0, 100, 100],
});

export default memo(({ transforms = null, onTransform }) => {
  const classes = useStyles();
  const widgetRef1 = useRef(null);
  const widgetRef2 = useRef(null);
  const widgetRef3 = useRef(null);

  return (
    <FigureWidget targets={[widgetRef1, widgetRef2, widgetRef3]} transforms={transforms} onTransform={onTransform}>
      <div className={`${classes.target} target1`} ref={widgetRef1} id="target1">
        Target1
      </div>
      <div className={`${classes.target} target2`} ref={widgetRef2} id="target2">
        Target2
      </div>
      <div className={`${classes.target} target3`} ref={widgetRef3} id="target3">
        Target3
      </div>
    </FigureWidget>
  );
});
