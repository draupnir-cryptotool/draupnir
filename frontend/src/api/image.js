import axios from './init'

export function createImage({ file, idType, clientId }) {
  const data = new FormData()
  data.append('image', file)
  data.append('idType',idType)
  data.append('clientId', clientId)
  return axios.post('/api/images', data)
    .then(res => res.data)
} 

export function allImageData() {
  return axios.get('./api/images')
  .then(res => res.data)
}