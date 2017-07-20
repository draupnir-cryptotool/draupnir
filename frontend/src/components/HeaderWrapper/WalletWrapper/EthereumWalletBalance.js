import React from 'react'

export default function EthereumWalletBalance({
  etherBalance
}) {
  const ethBalanceStyle = {
    fontSize: '3.5rem',
    marginBottom: '0px',
    color: "#3E47FF"
  }
  return (
    <div className='ethBalance'>
      <p style={ethBalanceStyle}>ETH - </p>
      <span style={{fontSize: '2.5rem', verticalAlign: 'middle', color: "white"}}>{ etherBalance.ethWalletBalance }</span>
    </div>
  )
}