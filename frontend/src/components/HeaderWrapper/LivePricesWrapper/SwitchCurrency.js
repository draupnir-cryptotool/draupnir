import React from 'react'

export default function SwitchCurrency({
  currentCurrency,
  onSwitchUSD,
  onSwitchAUD
}) {
  return (
    <div>
      <button className={ currentCurrency === 'usd' ? 'activecurrency' : '' } onClick={onSwitchUSD}>USD</button>
      <button className={ currentCurrency === 'aud' ? 'activecurrency' : '' } onClick={onSwitchAUD}>AUD</button>
    </div>
  )
}