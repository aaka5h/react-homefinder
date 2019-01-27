
export const convertToQuery = (object) => {
  const arr = [];
  for (const key in object) {
    console.log(key);
    if (typeof object[key] !== 'object') {
      arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`);
    }
  }
  return arr.join('&');
};
