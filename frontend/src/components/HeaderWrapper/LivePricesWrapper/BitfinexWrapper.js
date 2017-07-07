import React from 'react'
import BitfinexBitcoinUsd from './BitfinexBitcoinUsd'
import BitfinexEthUsd from './BitfinexEthUsd'

export default function BitfinexWrapper({
  currentCurrency, bitfinexBtcValue, bitfinexEthValue
}) {
  return (
    <div>
      <BitfinexBitcoinUsd
        bitfinexBtcValue={ bitfinexBtcValue }
        currentCurrency={ currentCurrency }
      />
      <BitfinexEthUsd
        bitfinexEthValue={ bitfinexEthValue }
        currentCurrency={ currentCurrency }
      />
    </div>
  )
}