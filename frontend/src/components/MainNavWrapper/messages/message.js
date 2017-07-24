import React from 'react'
import './messages.css'
import Moment from 'react-moment'

export default function Message({
  message, time, onMessageDelete, messageId
}) {

  const handleMessageDelete = (messageId, onMessageDelete) => {
    onMessageDelete({ messageId })
  }
  return (
    <div>
      <div>
        <div style={{display: 'grid', gridTemplateColumns: '[col] 150px [col] 320px', gridGap: '3px', marginTop: '5%'}}>
          <div style={{gridColumn: '1 / 1'}}></div>
          <Moment style={{color: "#a9a9a9"}} fromNow interval={0} date={time}/>
          <p style={{color: '#a1d2ff', fontSize: '1.6em'}}>From Rupert:</p>
          <p style={{color: 'white', fontSize: '1.6em'}}>{message}</p>
          <div></div>
          <div style={{borderBottom: 'solid 1px #525252', paddingBottom: '2em'}}>
            <span className="messageCrudBtn" >edit</span>
            <span className="messageCrudBtn" onClick={() => handleMessageDelete(messageId, onMessageDelete)} >delete</span>
          </div>
        </div>
      </div>    
    </div>
  )
}
