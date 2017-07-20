import React from 'react'

import SettingsForm from './settingsForm'


export default function Settings({
  onUpdate, settings, onBtcUpdate, onEthUpdate

}) {

  return (
    <div>
      <SettingsForm
        onUpdate={ onUpdate }
        settings={ settings }
        onBtcUpdate={ onBtcUpdate }
        onEthUpdate={ onEthUpdate }
      />
    </div>
  )
}