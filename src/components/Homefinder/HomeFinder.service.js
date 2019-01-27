import Axios from 'axios';
import HomeModel from '../homes/home.model';
import { convertToQuery } from '../../utils/requests/axios.get';

const PARTNER_ID = process.env.REACT_APP_PARTNER_ID;
console.log(PARTNER_ID);


const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
// axios.defaults.headers.get['Conthent-Type'] = 'application/json';
// axios.defaults.headers.get['content-type'] = 'application/json';
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

axios.interceptors.response.use((response) => {
  console.log('response:', response);
  return response;
},
error => Promise.reject(error));

export const findHomes = queryObject => axios.get(
  `/search/homes?${convertToQuery({
    ...queryObject,
    partnerid: PARTNER_ID,
    markets: 181,
  })}`,
)
  .then(response => new Promise((resolve, reject) => {
    const homes = [];
    response.data.Result.forEach((home) => {
      homes.push(new HomeModel(home));
    });
    resolve(homes);
  }))
  .catch(error => Promise.reject(error));


export const test = null;
