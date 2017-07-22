import React from 'react'
import { Button } from 'react-bootstrap'
import FaRefresh from 'react-icons/lib/fa/refresh'
import './wallet.css'

export default function EthereumWalletBalance({
  etherBalance, onEthUpdate
}) {
  const ethBalanceStyle = {
    fontSize: '3.5rem',
    marginBottom: '0px',
    color: "#3E47FF"
  }
  return (
    <div>
      <div style={{display: 'flex'}}>
        <p style={ethBalanceStyle}>ETH - </p>
        <span className="refreshBtn" style={{marginTop: '6%', marginLeft: '2em'}}>
          <FaRefresh style={{color: 'white'}} fontSize={25} onClick={ onEthUpdate }/>
        </span>
      </div>
        <p style={{fontSize: '2.5rem', verticalAlign: 'middle', color: "white"}}>{ etherBalance.ethWalletBalance }</p>
      <div>
      </div>
    </div>
  )
}
