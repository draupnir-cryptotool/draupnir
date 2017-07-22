import React from 'react'

export default function BitfinexEthPrice({
  bitfinexEthValue
}) {
  return (
    <div>
      <p style={{color: 'white', fontSize: '19px'}}>{ bitfinexEthValue }</p>
    </div>
  )
}