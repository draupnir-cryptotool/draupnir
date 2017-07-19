import api from './init'

export function createImage({ file, idType, clientId }) {
  const data = new FormData()
  data.append('image', file)
  data.append('idType',idType)
  data.append('clientId', clientId)
  return api.post('/api/images', data)
    .then(res => res.data)
} 

export function allImageData() {
  return api.get('./api/images')
  .then(res => res.data)
}