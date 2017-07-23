import React from 'react'
import './messages.css'


export default function Message({
  message, time
}) {
  

  return (
    <div>
      <div>
        <div style={{display: 'grid', gridTemplateColumns: '[col] 150px [col] 320px', gridGap: '3px', marginTop: '5%'}}>
          <div style={{gridColumn: '1 / 1'}}></div>
          <p style={{color: '#969696', fontSize: '1.2em'}}>{time}</p>  
          <p style={{color: 'white', fontSize: '1.6em'}}>From Rupert:</p>
          <p style={{color: 'white', fontSize: '1.6em'}}>{message}</p>
          <div></div>
        </div>
      </div>    
    </div>
  )
}
