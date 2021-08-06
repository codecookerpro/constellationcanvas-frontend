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
