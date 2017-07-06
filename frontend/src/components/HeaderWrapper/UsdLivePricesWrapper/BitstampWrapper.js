import React from 'react'
import BitstampBitcoinPrice from './BitstampBitcoinPrice'

export default function BitstampWrapper({
  bitstampBtcValue
}) {
  return (
    <div>
      <BitstampBitcoinPrice bitstampBtcValue={ bitstampBtcValue } />
    </div>
  )
}