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
          <BitcoinBalance
            bitBalance={ bitBalance }
            />

        <EthereumBalance
          etherBalance={ etherBalance }
        /> 
      </div>
      <div style={{display: 'grid'}}>
        <Button className='refreshBtn' onClick={ onBtcUpdate }>Refresh</Button>
        <Button className='refreshBtn' onClick={ onEthUpdate }>Refresh</Button>
      </div>
    </div>

  )
}
