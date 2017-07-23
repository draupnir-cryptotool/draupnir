import React from 'react'
import { Button } from 'react-bootstrap'
import './messages.css'

export default function Message({
  forId, 
  message, 
  onCreateMessage, 
  currentUser
}) {

  const handleCreateMessage = (e, onCreateMessage) => {
    e.preventDefault()
    const form = e.target
    const message = form.message.value
    const currentUserId = currentUser._id
    console.log(message, currentUserId)
    onCreateMessage({currentUserId, message})
  }

  return (
    <div style={{display: 'flex'}}>
      <div>
        <div style={{display: 'grid', gridTemplateColumns: '[col] 150px [col] 320px', gridGap: '3px', marginTop: '5%'}}>
          <div style={{gridColumn: '1 / 1'}}></div>
          <p style={{color: '#969696', fontSize: '1.2em'}}>Yesterday 1200</p>  
          <p style={{color: 'white', fontSize: '1.6em'}}>From Jaime:</p>
          <p style={{color: 'white', fontSize: '1.6em'}}>Chris has really done nothing this whole project. My shoulders
          are really really sore.. From holding up the team! </p>
          <div></div>
        </div>
      </div>
      <div style={{width: '480px', marginLeft: '4em'}}>
        <p style={{color: 'white', fontSize: '2em'}}>Message</p>
        <form onSubmit={(e) => handleCreateMessage(e, onCreateMessage)}>
          <textarea name="message" style={{background: 'none', border: 'solid 1px white', borderRadius: '5px', height: '9em', color: 'white', width: '100%', fontSize: '1.6em'}}/>
          <Button className="sendBtn" bsStyle="primary" type="submit">send</Button>
        </form>
      </div>        
    </div>
  )
}
