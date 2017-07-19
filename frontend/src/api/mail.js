import api from './init'

export function sendMail({ subject, text }) {
  return api.post('/api/mail', {
      subject,
      text
  })
  .then(res => res.data)
}