import React from 'react'
import BitfinexBitcoinUsd from './BitfinexBitcoinUsd'
import BitfinexEthUsd from './BitfinexEthUsd'

export default function BitfinexWrapper({
  btcValue,ethValue
}) {
  return (
    <div>
      <BitfinexBitcoinUsd btcValue={ btcValue } />
      <BitfinexEthUsd ethValue={ ethValue } />
    </div>
  )
}