import React from 'react'

import SettingsForm from './settingsForm'


export default function Settings({
  onUpdate, settings, oneBtcUpdate, onEthUpdate

}) {

  return (
    <div>
      <SettingsForm
        onUpdate={ onUpdate }
        settings={ settings }
        oneBtcUpdate={ oneBtcUpdate }
        onEthUpdate={ onEthUpdate }
      />
    </div>
  )
}