import React from 'react'
import Message from './message'
import { Button } from 'react-bootstrap'
import _ from 'lodash'
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

export default function MessagesWrapper({
  adminMessages, 
  from, 
  message, 
  onCreateMessage, 
  currentUser,
  onMessageDelete
}) {

  const handleCreateMessage = (e, onCreateMessage) => {
    e.preventDefault()
    const form = e.target
    const message = form.message.value
    const currentUserId = currentUser._id
    onCreateMessage({currentUserId, message})
    document.getElementById('message').value = ""
  }
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div className='message'>
        <ReactCSSTransitionGroup
          transitionName="messageLoad"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={300}
          >
      {
        adminMessages.length > 0 ? adminMessages.map((adminMessage) => (
            <Message
              key={ adminMessage._id }
              message={ adminMessage.message }
              messageId={ adminMessage._id }
              time={ adminMessage.time }
              from={ adminMessage.from }
              onMessageDelete={ onMessageDelete }
            />
        ))
        :
        <h1 style={{color: 'white', position: 'absolute', top: '4em'}}>No messages...</h1>
      }
      </ReactCSSTransitionGroup>
      </div>
      <div style={{width: '480px', marginTop: '1.4em'}}>
        <p style={{color: 'white', fontSize: '2em'}}>Message</p>
        <form onSubmit={(e) => handleCreateMessage(e, onCreateMessage)}>
          <textarea id="message" name="message" placeholder="  type message.." style={{background: 'none', border: 'solid 1px white', borderRadius: '5px', height: '9em', color: 'white', width: '100%', fontSize: '1.6em'}}/>
          <Button className="sendBtn" bsStyle="primary" type="submit">send</Button>
        </form>
      </div>    
    </div>
  )
}
