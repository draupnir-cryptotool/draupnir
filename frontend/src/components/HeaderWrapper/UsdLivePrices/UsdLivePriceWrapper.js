import React from 'react'
import BitfinexWrapper from './BitfinexWrapper'
import BtceWrapper from './BtceWrapper'
import BitstampWrapper from './BitstampWrapper'

export default function UsdLivePriceWrapper({
  bitfinexBtcValue, bitfinexEthValue, btceBtcValue, btceEthValue, bitstampBtcValue
}) {
  return (
    <div>
      <BitfinexWrapper
        bitfinexBtcValue={ bitfinexBtcValue }
        bitfinexEthValue={ bitfinexEthValue }
      />
      <BtceWrapper
        btceBtcValue={ btceBtcValue }
        btceEthValue={ btceEthValue }
      />
      <BitstampWrapper
        bitstampBtcValue={ bitstampBtcValue }
      />
    </div>
  )
}