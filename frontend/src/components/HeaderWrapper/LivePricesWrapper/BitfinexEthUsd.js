import React from 'react'

export default function BitfinexEthUsd({
  bitfinexEthValue
}) {
  return (
    <div>
      <h4>Bitfinex_ETH/USD - { bitfinexEthValue.btcUsdPrice }</h4>
    </div>
  )
}