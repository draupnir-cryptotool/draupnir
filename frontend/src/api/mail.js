import axios from './init'

export function sendMail(emailProps) {
  let subject = emailProps.subject;
  let text = emailProps.text;
  let file = emailProps.file;
  return axios.post('/api/mail', {
      subject,
      text,
      file,
  })
  .catch((err) => {
    console.log('Failed in frontend mail api axios call with error: ' + err);
  })
  .then(res => res.data)
}
