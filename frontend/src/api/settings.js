import axios from './init'

export function fetchSettings() {
  return axios.get('/api/settings')
  // bring in json data
    .then(res => res.data)
}

export function updateSettings({ bitfinexFloat, btceFloat, bitstampFloat, btceWalletAddress, ethWalletAddress }) {
  // TODO: send id to env variable
  return axios.patch('/api/settings/5992c2f1660951f72d4a6cfe', {
      bitfinexFloat,
      btceFloat,
      bitstampFloat,
      btceWalletAddress,
      ethWalletAddress
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
