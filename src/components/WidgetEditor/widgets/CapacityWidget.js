import { useRef } from 'react';
import BaseWidget from './BaseWidget';
import useImageStyles from './use-image-styles';

const CapacityWidget = (props) => {
  const classes = useImageStyles({ type: props.type, group: props.group, defaultWidth: 97, defaultHeight: 124 });
  const figureRef = useRef();

  return (
    <BaseWidget {...props} rotatable={true} keepRatio={true} target={figureRef}>
      <div ref={figureRef} className={classes.root} />
    </BaseWidget>
  );
};

export default CapacityWidget;