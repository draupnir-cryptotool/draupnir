import api from './init'

export function allOrders() {
  return api.get('/api/orders')
  .then(res => res.data )
}


export function queryOrder({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit }) {
  return api.get('/api/order', {
    params: {
    buying: buying,
    tally: tally,
    amount: amount,
    bitfinexLimit: bitfinexLimit,
    btceLimit: btceLimit,
    bitstampLimit: bitstampLimit
    }
  })
  .then(res => res.data)
}
