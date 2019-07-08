import Model from '../../../utils/models/Model';

export default class FacetsModel extends Model {
  totalResults;

  constructor(data) {
    super();
    this.setPrice(data.PrRange);
    this.setBathrooms(data.BrRange);
    this.setBedrooms(data.BaRange);
    console.log('facet model:', this);
  }

  setPrice(range) {
    const res = this.splitRange(range);
    ([this.minPrice, this.maxPrice] = res);
  }

  setBathrooms(baths) {
    const res = this.splitRange(baths);
    ([this.bathroomMin, this.bathroomMax] = res);
  }

  setBedrooms(beds) {
    const res = this.splitRange(beds);
    ([this.bedroomMin, this.bedroomMax] = res)
  }
}
