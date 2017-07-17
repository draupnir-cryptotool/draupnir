import React from 'react'
import { Button } from 'react-bootstrap'
import ClientImageModal from '../../../Modal/ClientImageModal'

export default function InfoPage({
  client, showModal, closeModal, showClientImageModal, closeImageModal,
  uploadPhoto, image
}){
  return (
    <div style={{ display: 'flex' }}>
      <div style={{  marginRight: '20%' }}>
        <h1>Contact</h1>
        <h3>Name: <span>{client.firstname + " " + client.lastname}</span></h3>
        <h3>Phone number: <span>{client.phone}</span></h3>
        <h3>Email: <span>{client.email}</span></h3>
      </div>
      <ClientImageModal
        showClientImageModal={ showClientImageModal }
        closeImageModal={ closeImageModal }
        uploadPhoto={ uploadPhoto }
        image={ image }
        clientId={client._id} />
      <div>
        <h1>ID</h1>
        <Button type="submit" bsStyle={'primary'} onClick={ () => showModal() }>Add</Button>
      </div>
    </div>
  )
}
