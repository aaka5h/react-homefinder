export default class FacetAdapter {
  constructor(facets) {
    this.model = facets;
  }

  get facetModel() {
    return this.model;
  }

  buildRange(low, high, step) {
    const arr = [];
    for (let i = low; i <= (high + step); i += step) {
      arr.push(i);
    }
    return arr;
  }

  buildOption(range) {
    return range.reduce((res, el) => {
      res.push({
        value: el,
        label: el,
      });
      return res;
    }, []);
  }


  buildPriceOptions() {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });

    const range = this.buildOption(
      this.buildRange(this.model.minPrice, this.model.maxPrice, 10000),
    );

    range.forEach((el) => {
      const element = { ...el };
      el.label = formatter.format(el.label);
      return element;
    });

    return range;
  }
}
