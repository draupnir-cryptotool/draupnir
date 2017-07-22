import React from 'react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'
import ClientImageModal from '../../../Modal/ClientImageModal'
import _ from 'lodash'
import FaFileImg from 'react-icons/lib/fa/file-image-o'
import './pages.css'

export default function InfoPage({
  client, showModal, closeModal, showClientImageModal, closeImageModal,
  uploadPhoto, imageData
}){
  const viewImageStyle = {
    fontSize: '.7em',
    position: 'relative',
    left: '15%',
    marginTop: '1.9em'
  }

  const imageOverlay = (image) => (
    <Popover id="popover-positioned-top" title="Client ID">
      <div>
        <img width={ 200 } height={ 200 } src={image.s3URL} alt="id"/>
      </div>
    </Popover>
  )

  return (
    <div style={{ display: 'flex' }}>
      <div style={{  marginRight: '20%' }}>
        <h1 style={{color: 'white'}}>Contact</h1>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '5px', }}>
            <h3 style={{textAlign: 'right', color: 'white'}}>Name:</h3> 
            <h3 style={{gridColumn: '1/1', gridRow: '2', textAlign: 'right', color: 'white'}}>Number:</h3> 
            <h3 style={{gridColumn: '1/1', gridRow: '3', textAlign: 'right', color: 'white'}}>Email:</h3> 
            <p style={{marginTop: 'auto', marginLeft: '12%', fontSize: '1.2em'}}>{client.firstname + " " + client.lastname}</p>
            <p style={{marginTop: 'auto', marginLeft: '12%', fontSize: '1.2em'}}>{client.phone}</p>
            <p style={{marginTop: 'auto', marginLeft: '12%', fontSize: '1.2em'}}>{client.email}</p>
        </div>
      </div>
      <ClientImageModal
        showClientImageModal={ showClientImageModal }
        closeImageModal={ closeImageModal }
        uploadPhoto={ uploadPhoto }
        clientId={client._id} />
        <div>
          <h1 style={{color: 'white'}}>ID</h1>
          {
          imageData.map((image) => (
          <div key={image._id} style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '5px'}}>
            <h3 style={{color: 'white'}}>{image.idType}</h3>
            <span className="imgIcon" style={ viewImageStyle }><OverlayTrigger trigger="click" placement="top" overlay={imageOverlay(image)}>
            <FaFileImg size={30}/>
            </OverlayTrigger>
            </span>
          </div>
            ))
          }
        <Button type="submit" bsStyle={'primary'} onClick={ () => showModal() }>Add</Button>
      </div>
    </div>
  )
}
