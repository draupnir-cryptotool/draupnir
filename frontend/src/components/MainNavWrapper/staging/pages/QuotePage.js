import React from 'react'
import Field from '../../../Field'
import _ from 'lodash'

function generateQuotePdf(event, handlePdfQuote) {
  event.preventDefault()
  const form = event.target
  const exchange1 = form.elements['exchange1'].value
  handlePdfQuote({ exchange1 })
}

export default function OrderPage({ 
  ausPrice, handlePdfQuote, exchange1
}) {
  return (
      <div>
        <h3></h3>
        <form onSubmit={ (event) => generateQuotePdf(event, handlePdfQuote) }>
          <Field
            label="ACX.io"
            name="exchange1"
            type="text"
            defaultValue={ ausPrice }
          />
          <button>Submit</button>
        </form>
      </div>
  )
}
