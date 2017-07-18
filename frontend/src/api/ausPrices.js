import axios from './init'

export function ausPrices() {
  return axios.get('/api/ausprices')
  .then(res => res.data )
}

