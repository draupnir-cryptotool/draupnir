import axios from './init'

export function allOrders() {
  return axios.get('/api/orders')
  .then(res => res.data )
}
