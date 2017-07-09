import React from 'react'

export default function Ethereum({
  etherBalance
}) {
  const ethBalanceStyle = {
    fontSize: '3.5rem',
    marginBottom: '0px'
  }
  return (
    <div className='ethBalance'>
      <p style={ethBalanceStyle}>ETH - </p>
      <span style={{fontSize: '2.5rem', verticalAlign: 'middle'}}>{ etherBalance.balance }</span>
    </div>
  )
}