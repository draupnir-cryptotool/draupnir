import React from 'react'

export default function BitfinexBitcoinUsd({
  currentCurrency,
  bitfinexBtcValue
}) {
  return (
    <div>
      <h4>Bitfinex_BTC/USD - { bitfinexBtcValue.btcUsdPrice }</h4>
    </div>
  )
}