import ApiQuery from './ApiQuery.model';


const mapper = {
  prLow: 'minPrice',
  prHigh: 'maxPrice',
  page: 'page',
};

export default function HomeFinderQueryFactory(type, query) {
  if (type === 'api') {
    const api = new ApiQuery();
    Object.keys(mapper).forEach(key => {
      api[key] = query[mapper[key]];
    });
    return api;
  }
}
