import axios from 'axios';
import { convertToQuery } from '../../../utils/requests/axios.get';

const PARTNER_ID = process.env.REACT_APP_PARTNER_ID;


export const getHomeDetails = (query) => {
  return axios.get(`/detail/home/?${convertToQuery({...query, partnerid: PARTNER_ID})}`)
    .then((response) => {
      return Promise.resolve(response.data);
    });
};
