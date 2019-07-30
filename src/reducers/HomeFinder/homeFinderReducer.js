import {
  LOAD_MORE_HOMES,
  REFRESH_SEARCH,
  UPDATE_FACETS,
  LOADING_MORE_HOMES, REFRESHING_SEARCH,
} from '../../actions/HomeFinder/index';
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
    totalResult: 0,
  },
  facetsLoaded: false,
  resultSummary: {
    totalResults: 0,
  },
};

const updateFacetsState = (state, action) => {
  if (state.facetsLoaded) return state;

  const f = new FacetsModel(action.facets);
  return {
    ...state,
    facets: f,
    facetsLoaded: true,
    resultSummary: action.resultSummary,
  };
};

const homeFinderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REFRESHING_SEARCH:
      return {
        ...state,
        searching: true,
      };
    case REFRESH_SEARCH:
      return {
        ...state,
        homes: action.homes,
        searching: false,
        pagesLoaded: 1,
        resultSummary: action.resultSummary,
      };
    case LOAD_MORE_HOMES:
      const oldHomes = [...state.homes];
      const homes = oldHomes.concat(action.homes);
      return {
        ...state,
        pagesLoaded: state.pagesLoaded + 1,
        loadingMore: false,
        homes,
      };
    case UPDATE_FACETS:
      return updateFacetsState(state, action);
    case LOADING_MORE_HOMES:
      return {
        ...state,
        loadingMore: true,
      };
    default:
      return state;
  }
};


export default homeFinderReducer;
