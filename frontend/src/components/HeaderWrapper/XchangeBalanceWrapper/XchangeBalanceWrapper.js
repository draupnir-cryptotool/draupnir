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
        <p style={{textAlign: 'right'}}>Bitfinex: </p>
        <p style={{textAlign: 'right'}}>BTC-E:</p>
        <p style={{textAlign: 'right'}}>Bitstamp:</p>
      </div>
      <div className="xchangeWrapper" style={{marginLeft: '3rem'}}>
        <p>${ settings.bitfinexFloat }</p>
        <p>${ settings.btceFloat }</p>
        <p>${ settings.bitstampFloat }</p>
      </div>
    </div>
  )
}
