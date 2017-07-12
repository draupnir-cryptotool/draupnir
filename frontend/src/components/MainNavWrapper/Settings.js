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
  onUpdate
}) {
  return (
    <div>
      <h1>Settings page</h1>
      <form onUpdate={ (event) => submitUpdateRequest(event, onUpdate) }>
        <Field label="Bitfinex Balance" name="bitfinexFloat" />
        <Field label="Btc-E Balance" name="btceFloat" />
        <Field label="Bitstamp Balance" name="bitstampFloat" />
        <button>Update</button>
      </form>
    </div>
  )
}