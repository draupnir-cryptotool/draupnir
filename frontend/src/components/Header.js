import React from 'react';
import WalletWrapper from './HeaderWrapper/WalletWrapper/WalletWrapper'
import LivePriceWrapper from '../components/HeaderWrapper/LivePricesWrapper/LivePriceWrapper'
import XchangeBalanceWrapper from '../components/HeaderWrapper/XchangeBalanceWrapper/XchangeBalanceWrapper'


const divStyle = {
  display: 'flex',
  justifyContent: 'space-around'
}

const wrapperStyle = {
  border: 'solid 1px',
  padding: '30px'
}


export default function Header ({
  settings, bitBalance, onBtcUpdate, etherBalance, onEthUpdate,
  bitfinexBtcValue, bitfinexEthValue, btceBtcValue, btceEthValue,
  bitstampBtcValue, onCurrencyChangeUsd, onCurrencyChangeAud
}) {

  return (
    <div style={divStyle}>
      <div style={wrapperStyle}>
        <XchangeBalanceWrapper 
          settings={ settings }
        />
      </div>
      <div style={wrapperStyle}>
        <WalletWrapper
          bitBalance={ bitBalance }
          onBtcUpdate={ onBtcUpdate }
          etherBalance={ etherBalance }
          onEthUpdate={ onEthUpdate }
        />
      </div>
      <div style={wrapperStyle}>
        <LivePriceWrapper
          bitfinexBtcValue={ bitfinexBtcValue }
          bitfinexEthValue={ bitfinexEthValue }
          btceBtcValue={ btceBtcValue }
          btceEthValue={ btceEthValue }
          bitstampBtcValue={ bitstampBtcValue }
          onCurrencyChangeUsd={ onCurrencyChangeUsd }
          onCurrencyChangeAud={ onCurrencyChangeAud }
        />
        </div>
    </div>
  )
}