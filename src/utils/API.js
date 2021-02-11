//This Is to create base url for Axio

import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
  responseType: 'json',
});
