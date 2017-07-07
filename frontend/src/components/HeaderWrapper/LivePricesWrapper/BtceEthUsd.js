import React from 'react'

export default function BtceEthUsd({
  currentCurrency,
  btceEthValue
}) {
  return (
    <div>
      <h4>
        Btce_ETH - 
        { currentCurrency === 'usd' ? btceEthValue.usdPrice : btceEthValue.audPrice }
      </h4>
    </div>
  )
}