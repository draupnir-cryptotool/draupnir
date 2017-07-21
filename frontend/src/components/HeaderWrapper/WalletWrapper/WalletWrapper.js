import React from 'react'
import BitcoinWalletBalance from './BitcoinWalletBalance'
import EthereumWalletBalance from './EthereumWalletBalance'
import './wallet.css'

export default function WalletWrapper({
  bitBalance, etherBalance, onBtcUpdate, onEthUpdate
}) {

  return (
    <div style={{display: 'flex', marginRight: '3rem'}}>
      <div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div style={{marginBottom: '3px'}}>
            <BitcoinWalletBalance
            bitBalance={ bitBalance }
            />
          </div>
        </div>
        <div className="divider"></div>
        <div style={{display: "flex"}}>
          <div>
            <EthereumWalletBalance
              etherBalance={ etherBalance }
            /> 
          </div>
        </div>
      </div>
    </div>
  )
}
