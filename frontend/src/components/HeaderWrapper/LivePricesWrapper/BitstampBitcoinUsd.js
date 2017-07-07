import React from 'react'

export default function BitstampBitcoinUsd({
  bitstampBtcValue
}) {
  return (
    <div>
      <h4>Bitstamp_BTC/USD - { bitstampBtcValue.btcUsdPrice }</h4>
    </div>
  )
}