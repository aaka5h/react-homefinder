
export const convertToQuery = (object) => {
  const arr = [];
  for (const key in object) {
    if (typeof object[key] !== 'object') {
      arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`);
    }
  }
  return arr.join('&');
};
