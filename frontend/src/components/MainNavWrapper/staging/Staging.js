import React from 'react'
import './staging.css'
import ClientBar from './ClientBar'

export default function Staging({
  clientModal, clients
}){
  return (
    <div style={{ boxSizing: 'border-box', padding: "3em" }}>
      <div className="addBtn">
        <button onClick={() => (clientModal())}>Add</button>
      </div>
      <div id="clientBarTitle" style={{display: 'flex', justifyContent: 'center'}}>
        <div><p>CLIENT No.</p></div>
        <div><p>NAME</p></div>
        <div><p>DEPOSIT</p></div>
        <div><p>CURRENCY</p></div>
      </div>
      <ClientBar clients={ clients }/>
    </div>
  )
}
