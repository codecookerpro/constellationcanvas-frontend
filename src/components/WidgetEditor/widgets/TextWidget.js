import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';
import { WIDGET_IMG_BASE_URL } from 'constants/ui';
import { useRef, useState } from 'react';
import { TEXT_WIDGET_DEFAULT_PROPS, WIDGET_GROUPS } from '../constants';
import useDynamicSize from '../hooks/use-dynamic-size';

const useStyles = makeStyles({
  root: {
    width: (props) => props.width,
    height: (props) => props.height,
    backgroundImage: ({ group, type }) => `url(${WIDGET_IMG_BASE_URL}${group}/${type}.${WIDGET_GROUPS.find((g) => g.type === group).imageType})`,
    padding: ({ type, width, height }) => {
      const {
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
    overflow: 'auto',
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
    '&::-webkit-scrollbar': {
      width: '0.2em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 4,
    },
  },
});

const TextWidget = (props) => {
  const {
    uuid,
    data,
    type,
    group,
    transform: { sx, sy },
    onDataChange,
    onTransformStart,
    onTransformEnd,
  } = props;
  const moveableRef = useRef();
  const { width, height } = useDynamicSize(group, type, moveableRef);
  const classes = useStyles({ type, group, width, height, sx, sy });
  const wrapperRef = useRef();
  const textRef = useRef();
  const [editable, setEditable] = useState(false);
  const handleTextChange = (e) => {
    onDataChange(uuid, { text: e.target.value });
  };
  const handleDoubleClick = (e) => {
    e.preventDefault();
    setEditable(true);
    onTransformStart(uuid);
    setTimeout(() => textRef.current.focus());
  };

  const handleFocusOut = () => {
    setEditable(false);
    onTransformEnd(uuid);
  };

  return (
    <BaseWidget {...props} keepRatio={false} target={wrapperRef} ref={moveableRef}>
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
