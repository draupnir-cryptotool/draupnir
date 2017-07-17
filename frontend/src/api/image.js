import axios from './init'

export function createImage({ file, idType }) {
  const data = new FormData()
  data.append('image', file)
  data.append('idType',idType)
  console.log(data)
  return axios.post('/api/images', data)
    .then(res => res.data)
} 
