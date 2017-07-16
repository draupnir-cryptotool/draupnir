import React from 'react'

import SettingsForm from './settingsForm'


export default function Settings({
  onUpdate, settings, 

}) {

  return (
    <div>
      <SettingsForm onUpdate={ onUpdate } settings={ settings }/>
    </div>
  )
}