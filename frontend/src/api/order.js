import axios from './init'

export function allOrders() {
  return axios.get('/api/orders')
  .then(res => res.data )
}

export function queryOrder({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit }) {
  return axios.get('/api/order', {
    params: {
    buying: buying,
    tally: tally,
    amount: amount,
    bitfinexLimit: bitfinexLimit,
    btceLimit: btceLimit,
    bitstampLimit: bitstampLimit
    }
  })
    .catch((error) => {
      console.log(error)
    })
  .then(res => res.data)
}
