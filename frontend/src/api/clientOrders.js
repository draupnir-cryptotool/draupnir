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

export function deleteOrder({ orderId }) {
  return axios.delete(`/api/clientorders/${orderId}`)
  .catch((err) => {
    console.log('Error in frontend API deleteOrder: ' + err);
  })
}

const statusTypeToField = {
  quoteSent: 'quoteSent',
  quoteAccepted: 'quoteAccepted',
  depositCleared: 'depositCleared',
  orderComplete: 'orderComplete'
}

export function updateVerifiedTrue({ orderId, statusType }) {
  const fieldName = statusTypeToField[statusType]
  return axios.patch(`/api/clientorders/${orderId}`,  {
    // Take advantage of MongoDB’s ability to use key paths
    [`status.${fieldName}`]: true 
  })
  .then(res => res.data)
}

export function updateVerifiedFalse({ orderId, statusType }) {
  const fieldName = statusTypeToField[statusType]
  return axios.patch(`/api/clientorders/${orderId}`,  {
    // Take advantage of MongoDB’s ability to use key paths
    [`status.${fieldName}`]: false
  })
  .then(res => res.data)
}
