import React from 'react'
import BtceBitcoinAud from './BtceBitcoinAud'
import BtceEthAud from './BtceEthAud'

export default function BtceWrapper({
  btceBtcValue, btceEthValue
}) {
  return (
    <div>
      <BtceBitcoinAud btceBtcValue={ btceBtcValue } />
      <BtceEthAud btceEthValue={ btceEthValue } />
    </div>
  )
}