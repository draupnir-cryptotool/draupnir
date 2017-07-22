import React from 'react'
import './XchangeBalance.css'
import styles from "./font.css"

export default function XchangeBalanceWrapper({
  settings
}) {
  const wrapperStyle = {
    display: 'flex',
  }
  return (
    <div style={{display: "grid", gridTemplateColumns: 'repeat(2, 1fr', gridGap: '5px', marginTop: "11%"}}>
      <div className="xchangeWrapper">
        <p style={{textAlign: 'right', color: '#3E47FF'}}>Bitfinex: </p>
        <p style={{textAlign: 'right', color: '#3E47FF'}}>BTC-E:</p>
        <p style={{textAlign: 'right', color: '#3E47FF'}}>Bitstamp:</p>
      </div>
      <div className="xchangeWrapper" style={{marginLeft: '3rem'}}>
        <p>${ settings.bitfinexFloat }</p>
        <p>${ settings.btceFloat }</p>
        <p>${ settings.bitstampFloat }</p>
      </div>
    </div>
  )
}
