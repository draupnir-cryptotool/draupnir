import axios from './init'

export function generatePdf(ausPrice) {
  console.log(ausPrice);
  return axios.get('/api/pdfquote', {
    params: {
      ausPrice
    }
  })
  .then(res => res.data )
}

