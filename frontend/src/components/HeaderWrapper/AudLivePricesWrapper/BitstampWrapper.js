import React from 'react'
import BitstampBitcoinAud from './BitstampBitcoinAud'

export default function BitstampWrapper({
  bitstampBtcValue
}) {
  return (
    <div>
      <BitstampBitcoinAud bitstampBtcValue={ bitstampBtcValue } />
    </div>
  )
}