import React from 'react';
import {
  Navbar,
} from 'react-bootstrap'
import Loader from 'react-loader';
import WalletWrapper from './HeaderWrapper/WalletWrapper/WalletWrapper'
import LivePriceWrapper from '../components/HeaderWrapper/LivePricesWrapper/LivePriceWrapper'
import XchangeBalanceWrapper from '../components/HeaderWrapper/XchangeBalanceWrapper/XchangeBalanceWrapper'
import LoggedInUser from '../components/HeaderWrapper/LoggednInUser'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

const divStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: "3%",
}

const wrapperStyle = {
  padding: '30px',
  minWidth: '25%',
  backgroundColor: '#3b3b3b',
  borderRadius: '5px'
}

export default function Header ({
  bitBalance,
  bitfinexBtcValue,
  bitfinexEthValue,
  bitstampBtcValue,
  btceBtcValue,
  btceEthValue,
  currentCurrency,
  currentUser,
  etherBalance,
  loader,
  onBtcUpdate,
  onCurrencyChangeAud,
  onCurrencyChangeUsd,
  onEthUpdate,
  settings,
}) {

  return (
    <div style={{
      position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-40px',
        margin: "2",
        color: "#969696",
        fontSize: "18px" 
        }}
      >
        {
          (!!currentUser ) ? ( 
            <LoggedInUser currentUser={ currentUser } />
          ) : ''
        }
      </div>
    <div style={divStyle}>
      <div style={wrapperStyle}>
        {
          (!!settings) ? (
            <XchangeBalanceWrapper 
              settings={ settings }
            />
          ) : <LoadingSpinner />
        }
      </div>

      <div style={wrapperStyle}>
        {
          (!!bitBalance && !!etherBalance) ? (
            <WalletWrapper
              bitBalance={ bitBalance }
              onBtcUpdate={ onBtcUpdate }
              etherBalance={ etherBalance }
              onEthUpdate={ onEthUpdate }
            />
          ) : <LoadingSpinner />
        }
      </div>

      <div style={wrapperStyle}>
        {
          (!!bitfinexBtcValue &&
          !!bitfinexEthValue &&
          !!bitstampBtcValue &&
          !!btceBtcValue &&
          !!btceEthValue) ? (
            <LivePriceWrapper
              bitfinexBtcValue={
                currentCurrency === 'usd'
                  ? bitfinexBtcValue.usdPrice 
                  : bitfinexBtcValue.audPrice 
              }
              bitfinexEthValue={
                currentCurrency === 'usd'
                  ? bitfinexEthValue.usdPrice
                  : bitfinexEthValue.audPrice
              }
              bitstampBtcValue={
                currentCurrency === 'usd'
                  ? bitstampBtcValue.usdPrice
                  : bitstampBtcValue.audPrice
              }
              btceBtcValue={
                currentCurrency === 'usd'
                  ? btceBtcValue.usdPrice
                  : btceBtcValue.audPrice
              }
              btceEthValue={
                currentCurrency === 'usd'
                  ? btceEthValue.usdPrice
                  : btceEthValue.audPrice
              }
              onCurrencyChangeUsd={ onCurrencyChangeUsd }
              onCurrencyChangeAud={ onCurrencyChangeAud }
              currentCurrency={ currentCurrency }
            />
          ) : <LoadingSpinner />
        }
      </div>
    </div>
    </div>
  )
}

