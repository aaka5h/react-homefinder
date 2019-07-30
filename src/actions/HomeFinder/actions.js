import Axios from 'axios';
import HomeModel from '../../components/homes/home.model';

import {
  LOAD_MORE_HOMES, LOADING_MORE_HOMES, REFRESH_SEARCH, REFRESHING_SEARCH, UPDATE_FACETS,
} from './action-names';
import { convertToQuery } from '../../utils/requests/axios.get';
import ResultSummary from '../../components/Homefinder/SearchBox/result-summary.model';

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

export const updateFacets = (facets, resultSummary) => ({
  type: UPDATE_FACETS,
  facets,
  resultSummary,
});


const loadingMoreHomes = () => ({
  type: LOADING_MORE_HOMES,
});

const refreshingSearch = () => ({
  type: REFRESHING_SEARCH,
});

export const fetchMoreHomes = queryObject => (dispatch) => {
  dispatch(loadingMoreHomes());
  return axios.get(
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
      // dispatch(loadMoreHomes(homes));
      setTimeout(() => dispatch(loadMoreHomes(homes)), 1000);
      return Promise.resolve(null);
    })
    .catch(error => Promise.reject(error));
};

const refreshSearch = ({ homes, resultSummary }) => ({
  type: REFRESH_SEARCH,
  homes,
  resultSummary,
});

export const searchHomes = query => (dispatch) => {
  dispatch(refreshingSearch());
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
      const resultSummary = new ResultSummary(response.data.ResultCounts);
      dispatch(refreshSearch({ homes, resultSummary }));
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
      const resultSummary = new ResultSummary(response.data.ResultCounts);
      dispatch(updateFacets(facets, resultSummary));
      return Promise.resolve(null);
    })
    .catch(error => Promise.reject(error));
};
