import React from 'react'
import BtceBitcoinUsd from './BtceBitcoinUsd'
import BtceEthUsd from './BtceEthUsd'

export default function BtceWrapper({
  btcValue, ethValue
}) {
  return (
    <div>
      <BtceBitcoinUsd btcValue={ btcValue } />
      <BtceEthUsd ethValue={ ethValue } />
    </div>
  )
}