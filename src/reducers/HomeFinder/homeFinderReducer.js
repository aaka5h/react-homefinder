import { LOAD_MORE_HOMES, REFRESH_SEARCH, UPDATE_FACETS } from '../../actions/HomeFinder/index';
import FacetsModel from '../../components/Homefinder/SearchBox/factets.model';


const defaultState = {
  homes: [],
  pagesLoaded: 0,
  pageSize: 10,
  searching: false,
  loadingMore: false,
  facets: {
    minPrice: 0,
    maxPrice: 0,
    beds: 0,
    baths: 0,
  },
  facetsLoaded: false,
};

const updateFacetsState = (state, action) => {
  if (state.facetsLoaded) return state;

  const f = new FacetsModel(action.facets);
  return {
    ...state,
    facets: f,
    facetsLoaded: true,
  };
};

const homeFinderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REFRESH_SEARCH:
      return {
        ...state,
        homes: action.homes,
      };
    case LOAD_MORE_HOMES:
      const oldHomes = [...state.homes];
      const homes = oldHomes.concat(action.homes);
      return {
        ...state,
        pagesLoaded: state.pagesLoaded + 1,
        homes: homes,
      };
    case UPDATE_FACETS:
      return updateFacetsState(state, action);
    default:
      return state;
  }
};


export default homeFinderReducer;
