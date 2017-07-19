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
    <div style={{display: "flex", marginTop: "11%"}}>
      <div className="xchangeWrapper">
        <p>Bitfinex: </p>
        <p>BTC-E:</p>
        <p>Bitstamp:</p>
      </div>
      <div className="xchangeWrapper" style={{marginLeft: '3rem'}}>
        <p>${ settings.bitfinexFloat }</p>
        <p>${ settings.btceFloat }</p>
        <p>${ settings.bitstampFloat }</p>
      </div>
    </div>
  )
}
