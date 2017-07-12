import React from 'react'
import Field from '../Field'

function submitUpdateRequest(event, onUpdate) {
  event.preventDefault()
  const form = event.target
  const bitfinexFloat = form.elements['bitfinexFloat'].value
  const btceFloat = form.elements['btceFloat'].value
  const bitstampFloat = form.elements['bitstampFloat'].value
  onUpdate({ bitfinexFloat, btceFloat, bitstampFloat })
}


export default function Settings({
  onUpdate, settings
}) {
  return (
    <div>
      <h1>Settings page</h1>
      <form onSubmit={ (event) => submitUpdateRequest(event, onUpdate) }>
        <Field
          label="Bitfinex Balance"
          name="bitfinexFloat"
          defaultValue={ settings.bitfinexFloat }
        />
        <Field
          label="Btc-E Balance"
          name="btceFloat"
          defaultValue={ settings.btceFloat }
        />
        <Field
          label="Bitstamp Balance"
          name="bitstampFloat"
          defaultValue={ settings.bitstampFloat }
        />
        <button>Update</button>
      </form>
    </div>
  )
}