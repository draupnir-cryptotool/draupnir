import axios from './init'

// Returns all client orders
export function allClientOrders() {
  return axios.get('/api/clientorders')
  .catch((err) => {
    console.log('Error in frontend API allClientOrders: ' + err);
  })
  .then(res => res.data )
}

// new client
export function createOrder({ clientId, amount, coin }) {
  return axios.post('/api/clientorders/new', {
    clientId,
    amount,
    coin,
  })
  .catch((err) => {
    console.log('Error in frontend API createOrder: ' + err);
  })
  .then(res => res.data)
}

