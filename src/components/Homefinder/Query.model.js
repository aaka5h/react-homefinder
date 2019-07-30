export default class Query {
  minPrice;

  maxPrice;

  bathrooms;

  bedrooms;

  stories;

  page;

  sort;

  constructor({ minPrice = 0, maxPrice = 0 } = {}) {
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }
}
