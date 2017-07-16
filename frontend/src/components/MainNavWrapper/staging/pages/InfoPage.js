import React from 'react'

export default function InfoPage({
  client
}){
  return (
    <div>
      <h3>Name: <span>{client.firstname + " " + client.lastname}</span></h3>
      <h3>Phone number: <span>{client.phone}</span></h3>
      <h3>Email: <span>{client.email}</span></h3>
    </div>
  )
}