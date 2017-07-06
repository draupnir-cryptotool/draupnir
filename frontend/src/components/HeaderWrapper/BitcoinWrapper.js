import React from 'react'
import Bitcoin from './Bitcoin'
import Refresh from '../Refresh'

export default function BitcoinWrapper({
  bitBalance, onUpdate
}) {
  return (
    <div className="flex-row">
      <Bitcoin bitBalance={ bitBalance } />
      <Refresh onUpdate={ onUpdate } />
    </div>
  )
}