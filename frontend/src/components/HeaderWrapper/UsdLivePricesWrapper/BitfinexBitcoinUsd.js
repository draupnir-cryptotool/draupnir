import React from 'react'

export default function BitfinexBitcoinUsd({
  bitfinexBtcValue
}) {
  return (
    <div>
      <h4>Bitfinex_BTC/USD - { bitfinexBtcValue.btcPrice }</h4>
    </div>
  )
}