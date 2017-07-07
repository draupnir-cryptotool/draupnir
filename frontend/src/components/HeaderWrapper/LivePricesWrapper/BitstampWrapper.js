import React from 'react'
import BitstampBitcoinUsd from './BitstampBitcoinUsd'

export default function BitstampWrapper({
  bitstampBtcValue
}) {
  return (
    <div>
      <BitstampBitcoinUsd bitstampBtcValue={ bitstampBtcValue } />
    </div>
  )
}