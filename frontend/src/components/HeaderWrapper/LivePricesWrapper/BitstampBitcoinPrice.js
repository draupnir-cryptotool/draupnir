import React from 'react'

export default function BitstampBitcoinPrice({
  bitstampBtcValue
}) {
  return (
    <div>
      <p style={{color: 'white', fontSize: '19px'}}>{ bitstampBtcValue }</p>
    </div>
  )
}