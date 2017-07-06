import React from 'react'

export default function BitfinexEthUsd({
  ethValue
}) {
  return (
    <div>
      <h4>Bitfinex_ETH/USD - { ethValue.ethPrice }</h4>
    </div>
  )
}