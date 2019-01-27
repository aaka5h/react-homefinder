export default class Model {
  splitRange(range) {
    const result = range.split('-')
      .reduce((res, el) => {
        res.push(+el);
        return res;
      }, []);

    return result;
  };
}
