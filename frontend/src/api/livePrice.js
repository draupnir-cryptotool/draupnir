import axios from './init'

export function fetchBitfinexBitcoinPrice() {
  return axios.get('/api/livecoinprices/bitfinex/btc')
  // bring in json data
    .then(res => res.data)
}

export function fetchBitfinexEthPrice() {
  return axios.get('/api/livecoinprices/bitfinex/eth')
  // bring in json data
    .then(res => res.data)
}

export function fetchBtceBitcoinPrice() {
  return axios.get('/api/livecoinprices/btc-e/btc')
  // bring in json data
    .then(res => res.data)
}

export function fetchBtceEthPrice() {
  return axios.get('/api/livecoinprices/btc-e/eth')
  // bring in json data
    .then(res => res.data)
}

export function fetchBitstampBitcoinPrice() {
  return axios.get('/api/livecoinprices/bitstamp/btc')
  // bring in json data
    .then(res => res.data)
}



