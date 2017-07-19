import React from 'react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'
import ClientImageModal from '../../../Modal/ClientImageModal'
import _ from 'lodash'

export default function InfoPage({
  client, showModal, closeModal, showClientImageModal, closeImageModal,
  uploadPhoto, imageData
}){
  const viewImageStyle = {
    fontSize: '.7em',
    position: 'relative',
    left: '15%'
  }

  const imageOverlay = (
    <Popover id="popover-positioned-top" title="Client ID">
      <div>
        <img width={ 200 } height={ 200 } src={imageData.s3URL} alt="id"/>
      </div>
    </Popover>
  )

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
        clientId={client._id} />
      <div>
        <h1>ID</h1> 
        <h3>{imageData.idType} 
        <span style={ viewImageStyle }><OverlayTrigger trigger="click" placement="top" overlay={imageOverlay}>
          { !!imageData ?
          <Button>View</Button>
          :
          ""
          }
        </OverlayTrigger>
        </span>
        </h3>

        <Button type="submit" bsStyle={'primary'} onClick={ () => showModal() }>Add</Button>
      </div>
    </div>
  )
}
