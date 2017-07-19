import api from './init'

export function fetchBitfinexBitcoinPrice() {
  return api.get('/api/livecoinprices/bitfinex/btc')
  // bring in json data
    .then(res => res.data)
}

export function fetchBitfinexEthPrice() {
  return api.get('/api/livecoinprices/bitfinex/eth')
  // bring in json data
    .then(res => res.data)
}

export function fetchBtceBitcoinPrice() {
  return api.get('/api/livecoinprices/btc-e/btc')
  // bring in json data
    .then(res => res.data)
}

export function fetchBtceEthPrice() {
  return api.get('/api/livecoinprices/btc-e/eth')
  // bring in json data
    .then(res => res.data)
}

export function fetchBitstampBitcoinPrice() {
  return api.get('/api/livecoinprices/bitstamp/btc')
  // bring in json data
    .then(res => res.data)
}



