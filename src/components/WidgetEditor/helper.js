export const parseTransform = (trans) => {
  const translate = trans.match(/translate\(([-0-9.]*)px, ([0-9.]*)px\)/);
  const rotate = trans.match(/rotate\(([-0-9.]*)deg\)/);
  const x = parseFloat(translate[1]);
  const y = parseFloat(translate[2]);
  const rotation = parseFloat(rotate[1]);

  return [x, y, rotation];
};

export const transformToString = ([x = 0, y = 0, rotation = 0]) => {
  return `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
};
