import api from './init'

export function fetchBitcoinPrice() {
  return api.get('/api/bitcoinbalance')
  // bring in json data
    .then(res => res.data)
}

export function fetchEthereumPrice() {
  return api.get('/api/ethereumbalance')
  // bring in json data
    .then(res => res.data)
}
