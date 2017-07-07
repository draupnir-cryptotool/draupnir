import React from 'react'

export default function BitfinexBitcoinUsd({
  currentCurrency,
  bitfinexBtcValue
}) {
  return (
    <div>
      <h4>
        Bitfinex_BTC - 
        { currentCurrency === 'usd' ? bitfinexBtcValue.usdPrice : bitfinexBtcValue.audPrice }
      </h4>
    </div>
  )
}





