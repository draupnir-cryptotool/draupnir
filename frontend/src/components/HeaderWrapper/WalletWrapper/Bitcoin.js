import React from 'react'

export default function Bitcoin({
  bitBalance
}) {
  return (
    <div className="bitBalance">
      <p style={{fontSize: '3.5rem', marginBottom: '0px', color: "#3E47FF"}}>BTC - </p>
      <span style={{fontSize: '2.5rem', verticalAlign: 'middle', color: "white"}}> { bitBalance.final_balance } </span>
    </div>
  )
}