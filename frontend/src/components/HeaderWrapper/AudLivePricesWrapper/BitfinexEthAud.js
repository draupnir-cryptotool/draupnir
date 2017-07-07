import React from 'react'

export default function BitfinexEthAud({
  bitfinexEthValue
}) {
  return (
    <div>
      <h4>Bitfinex_ETH/AUD - { bitfinexEthValue.ethPrice }</h4>
    </div>
  )
}