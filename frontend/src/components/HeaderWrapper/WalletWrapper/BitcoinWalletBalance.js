import React from 'react'
import { Button } from 'react-bootstrap'
import FaRefresh from 'react-icons/lib/fa/refresh'
import './wallet.css'

export default function BitcoinWalletBalance({
  bitBalance, onBtcUpdate
}) {
  return (
    <div>
      <div style={{display: 'flex'}}>
        <p style={{fontSize: '3.5rem', marginBottom: '0px', color: "#3E47FF"}}>BTC - </p>
        <span className="refreshBtn" style={{marginTop: '11%', marginLeft: '2em'}}>
          <FaRefresh style={{color: 'white'}} fontSize={25} onClick={ onBtcUpdate }/> 
        </span>
      </div>
      <div>
        <span style={{fontSize: '2.5rem', verticalAlign: 'middle', color: "white"}}> { bitBalance.btceWalletBalance } </span>
      </div>
    </div>
  )
}
