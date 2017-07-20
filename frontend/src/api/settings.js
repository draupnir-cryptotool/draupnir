import axios from './init'

export function fetchSettings() {
  return axios.get('/api/settings')
  // bring in json data
    .then(res => res.data)
}

export function updateSettings({ bitfinexFloat, btceFloat, bitstampFloat }) {
  // TODO: send id to env variable
  return axios.patch('/api/settings/59703a98ae87e52a7dfe210a', {
      bitfinexFloat,
      btceFloat,
      bitstampFloat
  })
  .then(res => res.data)
}

export function fetchBitcoinPrice() {
  return axios.get('/api/bitcoinbalance')
  // bring in json data
    .then(res => res.data)
}

export function fetchEthereumPrice() {
  return axios.get('/api/ethereumbalance')
  // bring in json data
    .then(res => res.data)
}
