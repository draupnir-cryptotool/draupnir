import React from 'react'

export default function BitfinexBitcoinUsd({
  btcValue
}) {
  return (
    <div>
      <h4>Bitfinex_BTC/USD - { btcValue.btcPrice }</h4>
    </div>
  )
}