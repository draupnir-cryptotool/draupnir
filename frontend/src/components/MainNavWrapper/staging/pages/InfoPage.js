import React from 'react'
import { Button } from 'react-bootstrap'

export default function InfoPage({
  client
}){
  return (
    <div style={{ display: 'flex' }}>
      <div style={{  marginRight: '20%' }}>
        <h1>Contact</h1>
        <h3>Name: <span>{client.firstname + " " + client.lastname}</span></h3>
        <h3>Phone number: <span>{client.phone}</span></h3>
        <h3>Email: <span>{client.email}</span></h3>
      </div>
      <div>
        <h1>ID</h1>
        <Button bsStyle={'primary'}>Add</Button>
      </div>
    </div>
  )
}