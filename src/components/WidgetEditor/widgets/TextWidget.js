import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';
import { WIDGET_IMG_BASE_URL } from 'constants/user-interface';
import { useRef, useState } from 'react';
import { TEXT_WIDGET_DEFAULT_PROPS, WIDGET_GROUPS } from '../constants';

const useStyles = makeStyles({
  root: {
    width: (props) => TEXT_WIDGET_DEFAULT_PROPS[props.type].width,
    height: (props) => TEXT_WIDGET_DEFAULT_PROPS[props.type].height,
    backgroundImage: ({ group, type }) => `url(${WIDGET_IMG_BASE_URL}${group}/${type}.${WIDGET_GROUPS.find((g) => g.type === group).imageType})`,
    padding: ({ type }) => {
      const {
        width,
        height,
        padding: { top, right, bottom, left },
      } = TEXT_WIDGET_DEFAULT_PROPS[type];
      return `${height * top}px ${width * right}px ${height * bottom}px ${width * left}px`;
    },
    backgroundSize: '100% 100%',
  },
  textarea: {
    fontSize: 18,
    border: 0,
    resize: 'none',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    outline: 'none',
    padding: 0,
    width: ({ sx }) => `${100 * Math.abs(sx)}%`,
    height: ({ sy }) => `${100 * Math.abs(sy)}%`,
    transformOrigin: '0 0',
    transform: ({ sx, sy }) => `scale(${1 / sx}, ${1 / sy})`,

    '&:disabled': {
      color: '#000000',
    },
  },
});

const TextWidget = (props) => {
  const {
    id,
    data,
    type,
    group,
    transform: { sx, sy },
    onDataChange,
    onTransformStart,
    onTransformEnd,
  } = props;
  const classes = useStyles({ type, group, sx, sy });
  const wrapperRef = useRef();
  const textRef = useRef();
  const [editable, setEditable] = useState(false);
  const handleTextChange = (e) => {
    onDataChange(id, { text: e.target.value });
  };
  const handleDoubleClick = (e) => {
    e.preventDefault();
    setEditable(true);
    onTransformStart(id);
    setTimeout(() => textRef.current.focus());
  };

  const handleFocusOut = () => {
    setEditable(false);
    onTransformEnd(id);
  };

  return (
    <BaseWidget {...props} keepRatio={false} target={wrapperRef}>
      <div ref={wrapperRef} className={classes.root} onDoubleClick={handleDoubleClick}>
        <textarea
          value={data?.text}
          className={classes.textarea}
          onChange={handleTextChange}
          ref={textRef}
          disabled={!editable}
          onBlur={handleFocusOut}
        />
      </div>
    </BaseWidget>
  );
};

export default TextWidget;
