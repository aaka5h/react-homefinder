/* eslint-disable no-underscore-dangle */
export default class FacetAdapter {
  _model;

  constructor(facets) {
    /**
     * @type FacetsModel
     */
    this._model = facets;
  }

  get facetModel() {
    return this._model;
  }

  static buildRange(low, high, step) {
    const arr = [];
    for (let i = low; i <= (high); i += step) {
      arr.push(i);
    }
    return arr;
  }

  static buildOption(range) {
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

    const range = this.constructor.buildOption(
      this.constructor.buildRange(this._model.minPrice, this._model.maxPrice, 10000),
    );

    return range.map((el) => {
      const element = { ...el };
      element.label = formatter.format(element.label);
      return element;
    });
  }

  buildBathroomOptions() {
    return this.constructor.buildOption(
      this.constructor.buildRange(this._model.bathroomMin, this._model.bathroomMax, 1),
    );
  }

  buildBedroomOptions() {
    return this.constructor.buildOption(
      this.constructor.buildRange(this._model.bedroomMin, this._model.bedroomMax, 1),
    );
  }

}
