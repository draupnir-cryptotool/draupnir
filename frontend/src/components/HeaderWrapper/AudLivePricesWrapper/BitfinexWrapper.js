import React from 'react'
import BitfinexBitcoinAud from './BitfinexBitcoinAud'
import BitfinexEthAud from './BitfinexEthAud'

export default function BitfinexWrapper({
  bitfinexBtcValue, bitfinexEthValue
}) {
  return (
    <div>
      <BitfinexBitcoinAud bitfinexBtcValue={ bitfinexBtcValue } />
      <BitfinexEthAud bitfinexEthValue={ bitfinexEthValue } />
    </div>
  )
}