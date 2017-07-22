import axios from './init'

export function allAdminMessages() {
  return axios.get('/api/messages/admin')
  .then(res => res.data)
}