import axios from './init'

export function allAdminMessages() {
  return axios.get('/api/messages/admin')
  .then(res => res.data)
}

export function createMessage({ from, message }) {
  return axios.post('/api/message/admin', {
    from,
    message
  })
  .then(res => res.data)
}

export function deleteMessage({ messageId }) {
  return axios.delete(`/api/message/${messageId}`, {
  })
  .then(res => res.data)
}
