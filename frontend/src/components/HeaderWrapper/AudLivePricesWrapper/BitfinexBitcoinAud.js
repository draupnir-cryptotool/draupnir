import React from 'react'

export default function BitfinexBitcoinAud({
  bitfinexBtcValue
}) {
  return (
    <div>
      <h4>Bitfinex_BTC/AUD - { bitfinexBtcValue.btcPrice }</h4>
    </div>
  )
}