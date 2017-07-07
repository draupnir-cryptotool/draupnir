import React from 'react'

export default function BitstampBitcoinUsd({
  currentCurrency,
  bitstampBtcValue
}) {
  return (
    <div>
      <h4>
        Bitstamp_BTC - 
        { currentCurrency === 'usd' ? bitstampBtcValue.usdPrice : bitstampBtcValue.audPrice }
      </h4>
    </div>
  )
}