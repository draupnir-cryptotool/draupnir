import React from 'react'
import BitfinexBitcoinUsd from './BitfinexBitcoinUsd'
import BitfinexEthUsd from './BitfinexEthUsd'

export default function BitfinexWrapper({
  bitfinexBtcValue, bitfinexEthValue
}) {
  return (
    <div>
      <BitfinexBitcoinUsd bitfinexBtcValue={ bitfinexBtcValue } />
      <BitfinexEthUsd bitfinexEthValue={ bitfinexEthValue } />
    </div>
  )
}