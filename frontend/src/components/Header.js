import React from 'react';
import WalletWrapper from './HeaderWrapper/WalletWrapper/WalletWrapper'
import LivePriceWrapper from '../components/HeaderWrapper/LivePricesWrapper/LivePriceWrapper'
import XchangeBalanceWrapper from '../components/HeaderWrapper/XchangeBalanceWrapper/XchangeBalanceWrapper'

const divStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: "3%"
}

const wrapperStyle = {
  padding: '30px',
  backgroundColor: '#3b3b3b',
  borderRadius: '5px'
}

export default function Header ({
  settings,
  bitBalance,
  onBtcUpdate,
  etherBalance,
  onEthUpdate,
  bitfinexBtcValue,
  bitfinexEthValue,
  btceBtcValue,
  btceEthValue,
  bitstampBtcValue,
  onCurrencyChangeUsd,
  onCurrencyChangeAud,
  currentCurrency
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
          currentCurrency={ currentCurrency }
        />
        </div>
    </div>
  )
}
