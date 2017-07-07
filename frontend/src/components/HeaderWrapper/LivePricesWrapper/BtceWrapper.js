import React from 'react'
import BtceBitcoinUsd from './BtceBitcoinUsd'
import BtceEthUsd from './BtceEthUsd'

export default function BtceWrapper({
  currentCurrency, btceBtcValue, btceEthValue
}) {
  return (
    <div>
      <BtceBitcoinUsd
        btceBtcValue={ btceBtcValue }
        currentCurrency={ currentCurrency }
      />
      <BtceEthUsd
        btceEthValue={ btceEthValue }
        currentCurrency={ currentCurrency }
      />
    </div>
  )
}