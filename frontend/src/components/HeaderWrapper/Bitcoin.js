import React from 'react'

export default function Bitcoin({
  bitBalance
}) {
  return (
    <div className="coincomponent">
      <h2>Bitcoin: { bitBalance.final_balance } </h2>
    </div>
  )
}