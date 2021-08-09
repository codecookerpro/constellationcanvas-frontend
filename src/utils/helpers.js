export const keyMirror = (obj) =>
  Object.freeze(
    Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [key]: obj[key] ? obj[key] : key,
      }),
      {}
    )
  );

export const toArray = (arg) => (Array.isArray(arg) ? arg : [arg]);

export const isNumber = (arg) => parseFloat(arg) === arg;
