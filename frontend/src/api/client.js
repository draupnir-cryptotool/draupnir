import axios from './init'

// get all clients
export function allClients() {
  return axios.get('/api/clients')
  .then(res => res.data)
}

// new client
export function createClient({ firstname, lastname, email, phone }) {
  return axios.post('/api/client/new', {
    firstname,
    lastname,
    email,
    phone
  })
  .then(res => res.data)
}

export function deleteClient({ clientId }) {
  return axios.delete(`/api/client/${clientId}`)
  .then(res => res.data)
}

const statusTypeToField = {
  idVerified: 'idVerified',
  quoteSent: 'quoteSent',
  quoteAccepted: 'quoteAccepted',
  depositCleared: 'depositCleared'
}

export function updateVerifiedTrue({ clientId, statusType }) {
  const fieldName = statusTypeToField[statusType]
  return axios.patch(`/api/client/${clientId}`,  {
    // Take advantage of MongoDB’s ability to use key paths
    [`status.${fieldName}`]: true 
  })
  .then(res => res.data)
}

export function updateVerifiedFalse({ clientId, statusType }) {
  const fieldName = statusTypeToField[statusType]
  return axios.patch(`/api/client/${clientId}`,  {
    // Take advantage of MongoDB’s ability to use key paths
    [`status.${fieldName}`]: false
  })
  .then(res => res.data)
}
