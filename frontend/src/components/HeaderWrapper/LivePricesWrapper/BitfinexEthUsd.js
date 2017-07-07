import React from 'react'

export default function BitfinexEthUsd({
  currentCurrency,
  bitfinexEthValue
}) {
  return (
    <div>
      <h4>
        Bitfinex_ETH - 
        { currentCurrency === 'usd' ? bitfinexEthValue.usdPrice : bitfinexEthValue.audPrice }
      </h4>
    </div>
  )
}