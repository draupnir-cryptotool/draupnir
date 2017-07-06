import React from 'react'

export default function BitfinexEthUsd({
  bitfinexEthValue
}) {
  return (
    <div>
      <h4>Bitfinex_ETH/USD - { bitfinexEthValue.ethPrice }</h4>
    </div>
  )
}