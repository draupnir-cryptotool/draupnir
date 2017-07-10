import React from 'react'
import './XchangeBalance.css'

export default function XchangeBalanceWrapper({
  bitfinexBalance, BTCEBalance, bitstampBalance
}) {
  const wrapperStyle = {
    display: 'flex',
  }
  return (
    <div className='xchangeWrapper'>
      <div>
        <p style={{fontSize: '2.5rem'}}>Bitfinex:</p>
        <p style={{fontSize: '2.5rem'}}>BTC-E:</p>
        <p style={{fontSize: '2.5rem'}}>Bitstamp:</p>
      </div>
      <div style={{marginLeft: '3rem'}}>
        <p style={{fontSize: '2.5rem'}}>${ bitfinexBalance }</p>
        <p style={{fontSize: '2.5rem'}}>${ BTCEBalance }</p>
        <p style={{fontSize: '2.5rem'}}>${ bitstampBalance }</p>
      </div>
    </div>
  )
}
