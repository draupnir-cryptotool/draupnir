import axios from './init'

export function fetchSettings() {
  return axios.get('/api/settings')
  // bring in json data
    .then(res => res.data)
}