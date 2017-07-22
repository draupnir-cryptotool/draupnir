import React from 'react'

export default function Message({
  admin, message, time
}) {


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
      <div>
        <p style={{color: 'white'}}>Message</p>
        <textarea style={{background: 'none', border: 'solid 1px white', borderRadius: '5px', height: '9em', color: 'white', width: '34em'}}/>
      </div>        
    </div>
  )
}
