import React from 'react'
import BtceBitcoinUsd from './BtceBitcoinUsd'
import BtceEthUsd from './BtceEthUsd'

export default function BtceWrapper({
  btceBtcValue, btceEthValue
}) {
  return (
    <div>
      <BtceBitcoinUsd btceBtcValue={ btceBtcValue } />
      <BtceEthUsd btceEthValue={ btceEthValue } />
    </div>
  )
}