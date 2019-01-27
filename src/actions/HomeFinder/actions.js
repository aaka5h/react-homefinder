import Axios from 'axios';
import HomeModel from '../../components/homes/home.model';

import { LOAD_MORE_HOMES, REFRESH_SEARCH, UPDATE_FACETS } from './action-names';
import { convertToQuery } from '../../utils/requests/axios.get';

const PARTNER_ID = process.env.REACT_APP_PARTNER_ID;

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axios.interceptors.response.use((response) => {
    console.log('response:', response);
    return response;
  },
  error => Promise.reject(error));

const loadMoreHomes = homes => ({
  type: LOAD_MORE_HOMES,
  homes,
});

export const updateFacets = facets => ({
  type: UPDATE_FACETS,
  facets,
});


export const fetchMoreHomes = queryObject => (dispatch) => {
  axios.get(
    `/search/homes?${convertToQuery({
      ...queryObject,
      partnerid: PARTNER_ID,
      markets: 181,
    })}`,
  )
    .then((response) => {
      const homes = [];
      response.data.Result.forEach((home) => {
        homes.push(new HomeModel(home));
      });
      dispatch(loadMoreHomes(homes));
    })
    .catch(error => Promise.reject(error));
};

const refreshSearch = homes => ({
  type: REFRESH_SEARCH,
  homes,
});

export const searchHomes = query => (dispatch) => {
  axios.get(
    `/search/homes?${convertToQuery({
      ...query,
      partnerid: PARTNER_ID,
      markets: 181,
    })}`,
  )
    .then((response) => {
      const homes = [];
      response.data.Result.forEach((home) => {
        homes.push(new HomeModel(home));
      });
      dispatch(refreshSearch(homes));
    })
    .catch(error => Promise.reject(error));
};

export const loadFacets = () => (dispatch) => {
  axios.get(
    `/search/homes?${convertToQuery({
      partnerid: PARTNER_ID,
      markets: 181,
    })}`,
  )
    .then((response) => {
      // TODO: cache facets or do sometig else
      const facets = response.data.ResultCounts.Facets;
      dispatch(updateFacets(facets));
    })
    .catch(error => Promise.reject(error));
};
