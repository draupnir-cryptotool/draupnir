import React from 'react'

export default function BitstampBitcoinUsd({
  btcValue
}) {
  return (
    <div>
      <h4>Bitstamp_BTC/USD - { btcValue.btcPrice }</h4>
    </div>
  )
}