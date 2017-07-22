import React from 'react'

export default function BitfinexBitcoinPrice({
  bitfinexBtcValue
}) {
  return (
    <div>
      <p style={{color: 'white', fontSize: '19px'}}>{ bitfinexBtcValue }</p>
    </div>
  )
}