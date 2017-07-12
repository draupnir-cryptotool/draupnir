import axios from './init'

export function createClient({ firstname, lastname, email, phonenumber }) {
  return axios.post('/api/client/new', {
    firstname,
    lastname,
    email,
    phonenumber
  })
  .then(res => console.log(res))
}