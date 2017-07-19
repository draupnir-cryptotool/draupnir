import axios from './init'


export function sendMail({ subject, text }) {
  return axios.post('/api/mail', {
      subject,
      text
  })
  .then(res => res.data)
}