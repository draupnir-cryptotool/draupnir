import api from './init'

export function signIn({ email, password, OTP }) {
  return api.post('/signin', {
      email,
      password,
      OTP
  })
  .then(res => res.data)
}

export function register({ email, firstname, lastname, password }) {
  return api.post('/register', {
      email,
      firstname,
      lastname,
      password
  })
  .then(res => res.data)
}