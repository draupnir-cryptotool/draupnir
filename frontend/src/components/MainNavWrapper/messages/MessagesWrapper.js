import React from 'react'
import Message from './message'

export default function MessagesWrapper({
  adminMessages, currentUser, onCreateMessage
}) {
  return (
    <div>
      <h1 style={{color: 'white'}}>Messages</h1>
      <Message 
        currentUser={currentUser}
        onCreateMessage={ onCreateMessage }/>
    </div>
  )
}
