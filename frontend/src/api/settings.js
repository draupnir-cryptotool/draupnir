import api from './init'

export function fetchSettings() {
  return api.get('/api/settings')
  // bring in json data
    .then(res => res.data)
}

export function updateSettings({ bitfinexFloat, btceFloat, bitstampFloat }) {
  // TODO: send id to env variable
  return api.patch('/api/settings/59642ab99039a21b6839c24e', {
      bitfinexFloat,
      btceFloat,
      bitstampFloat
  })
  .then(res => res.data)
}