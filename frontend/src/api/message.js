import axios from './init'

export function allAdminMessages() {
  return axios.get('/api/messages/admin')
  .then(res => res.data)
}

export function createMessage() {
  return axios.post('/api/messages')
  .then(res => res.data)
}
