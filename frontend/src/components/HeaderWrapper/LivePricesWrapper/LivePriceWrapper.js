import React from 'react'
import BitfinexWrapper from './BitfinexWrapper'
import BtceWrapper from './BtceWrapper'
import BitstampWrapper from './BitstampWrapper'

export default function LivePriceWrapper({
  currentCurrency, bitfinexBtcValue, bitfinexEthValue, btceBtcValue, btceEthValue, bitstampBtcValue
}) {
  return (
    <div>
      <BitfinexWrapper
        currentCurrency={ currentCurrency }
        bitfinexBtcValue={ bitfinexBtcValue }
        bitfinexEthValue={ bitfinexEthValue }
      />
      <BtceWrapper
      currentCurrency={ currentCurrency }
        btceBtcValue={ btceBtcValue }
        btceEthValue={ btceEthValue }
      />
      <BitstampWrapper
        currentCurrency={ currentCurrency }
        bitstampBtcValue={ bitstampBtcValue }
      />
    </div>
  )
}