import axios from './init'

export function sendMail(emailProps) {
  let email = emailProps.email;
  let subject = emailProps.subject;
  let text = emailProps.text;
  let file = emailProps.file;
  return axios.post('/api/mail', {
      email,
      subject,
      text,
      file,
  })
  .catch((err) => {
    console.log('Failed in frontend mail api axios call with error: ' + err);
  })
  .then(res => res.data)
}
