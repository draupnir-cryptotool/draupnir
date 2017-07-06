import React from 'react'
import BitstampBitcoinPrice from './BitstampBitcoinPrice'

export default function BitstampWrapper({
  btcValue
}) {
  return (
    <div>
      <BitstampBitcoinPrice btcValue={ btcValue } />
    </div>
  )
}