import axios from './init'

export function signIn({ email, password, OTP }) {
  return axios.post('/signin', {
      email,
      password,
      OTP
  })
  .then(res => res.data)
}

export function register({ email, firstname, lastname, password }) {
  return axios.post('/register', {
      email,
      firstname,
      lastname,
      password
  })
  .then(res => res.data)
}