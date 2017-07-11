import React from 'react'
import './XchangeBalance.css'

export default function XchangeBalanceWrapper({
  settings
}) {
  const wrapperStyle = {
    display: 'flex',
  }
  return (
    <div className='xchangeWrapper'>
      <div>
        <p style={{fontSize: '2.5rem'}}>Bitfinex: </p>
        <p style={{fontSize: '2.5rem'}}>BTC-E:</p>
        <p style={{fontSize: '2.5rem'}}>Bitstamp:</p>
      </div>
      <div style={{marginLeft: '3rem'}}>
        <p style={{fontSize: '2.5rem'}}>${ settings.bitfinexFloat }</p>
        <p style={{fontSize: '2.5rem'}}>${ settings.btceFloat }</p>
        <p style={{fontSize: '2.5rem'}}>${ settings.bitstampFloat }</p>
      </div>
    </div>
  )
}
