import ObjectID from 'bson-objectid';

export const parseTransform = (trans) => {
  const translate = trans.match(/translate\(([-0-9.]*)px, ([0-9.]*)px\)/);
  const rotate = trans.match(/rotate\(([-0-9.]*)deg\)/);
  const x = parseFloat(translate[1]);
  const y = parseFloat(translate[2]);
  const deg = parseFloat(rotate[1]);

  return { x, y, deg };
};

export const transformToString = ({ x = 0, y = 0, deg = 0 }) => {
  return `translate(${x}px, ${y}px) rotate(${deg}deg)`;
};

export const getUniqueId = () => {
  const ts = new Date().getTime();
  return ObjectID(ts).toHexString();
};
