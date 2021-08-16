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

export const generateAvatarName = (name) => {
  const nameSplit = (name || 'No Name').split(' ');

  if (nameSplit.length === 1) {
    if (nameSplit[0].length === 1) {
      return nameSplit[0].charAt(0).toUpperCase();
    } else if (nameSplit[0].length > 1) {
      return nameSplit[0].charAt(0).toUpperCase() + nameSplit[0].charAt(1).toUpperCase();
    }
  }

  return nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();
};
