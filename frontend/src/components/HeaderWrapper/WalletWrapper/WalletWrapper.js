import React from 'react'
import BitcoinWrapper from './BitcoinWrapper'
import EthereumWrapper from './EthereumWrapper'

export default function WalletWrapper({
  bitBalance, etherBalance, onBtcUpdate, onEthUpdate
}) {
  return (
    <div className="walletwrapper">
      <BitcoinWrapper
        bitBalance={ bitBalance }
        onUpdate={ onBtcUpdate }
      />
      <EthereumWrapper
        etherBalance={ etherBalance }
        onUpdate={ onEthUpdate }
      />
    </div>
  )
}