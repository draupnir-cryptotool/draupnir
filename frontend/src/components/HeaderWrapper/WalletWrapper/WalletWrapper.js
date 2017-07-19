import React from 'react'
import BitcoinBalance from './Bitcoin'
import EthereumBalance from './Ethereum'
import { Button } from 'react-bootstrap'
import './wallet.css'

export default function WalletWrapper({
  bitBalance, etherBalance, onBtcUpdate, onEthUpdate
}) {

  return (
    <div style={{display: 'flex', marginRight: '3rem'}}>
      <div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            <BitcoinBalance
            bitBalance={ bitBalance }
            />
          </div>
          <div>
            <Button className='refreshBtn' onClick={ onBtcUpdate }>Refresh</Button>
          </div>
        </div>
        <div style={{display: "flex"}}>
          <div>
            <EthereumBalance
              etherBalance={ etherBalance }
            /> 
          </div>
          <div>
            <Button className='refreshBtn' onClick={ onEthUpdate }>Refresh</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
