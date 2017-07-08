import axios from 'axios'

export function signIn({ email, password }) {
  return axios.post('/signin', {
      email,
      password
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