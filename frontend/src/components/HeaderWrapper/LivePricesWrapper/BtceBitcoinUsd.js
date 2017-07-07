import React from 'react'

export default function BtceBitcoinUsd({
  currentCurrency,
  btceBtcValue
}) {
  return (
    <div>
      <h4>
        Btce_BTC - 
        { currentCurrency === 'usd' ? btceBtcValue.usdPrice : btceBtcValue.audPrice }
      </h4>
    </div>
  )
}