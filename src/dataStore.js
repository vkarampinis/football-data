import axios from 'axios';

const options = {
  baseURL: 'https://api.football-data.org/v1/',
  responseType: 'json',
  timeout: 15000,
  headers: {
    'X-Auth-Token': '29daae2ea1e145a4ab0365a933bf96fd'
  }
};


const dataStore = {
  competitions: season => {
    return axios.get(options.baseURL + 'competitions?season=' + season, options);
  }
};


export default dataStore;