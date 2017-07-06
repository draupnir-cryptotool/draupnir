import React from 'react'


export default function UsdLivePriceWrapper({
  btcValue,ethValue
}) {
  return (
    <div>
      <BitfinexBitcoinUsd btcValue={ btcValue } />
      <BitfinexEthUsd ethValue={ ethValue } />
    </div>
  )
}