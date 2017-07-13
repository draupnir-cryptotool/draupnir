import axios from './init'

// get all clients
export function allClients() {
  return axios.get('/api/clients')
  .then(res => res.data)
}

// new client
export function createClient({ firstname, lastname, email, phonenumber }) {
  return axios.post('/api/client/new', {
    firstname,
    lastname,
    email,
    phonenumber
  })
  .then(res => res.data)
}