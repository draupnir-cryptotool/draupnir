import React from 'react'
import BitstampBitcoinUsd from './BitstampBitcoinUsd'

export default function BitstampWrapper({
  currentCurrency, bitstampBtcValue
}) {
  return (
    <div>
      <BitstampBitcoinUsd
        bitstampBtcValue={ bitstampBtcValue }
        currentCurrency={ currentCurrency }  
      />
    </div>
  )
}