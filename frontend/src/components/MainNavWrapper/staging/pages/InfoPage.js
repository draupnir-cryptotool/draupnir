import React from 'react'
import { Button, Popover } from 'react-bootstrap'
import ClientImageModal from '../../../Modal/ClientImageModal'
import WarningDeleteModal from '../../../Modal/warningDeleteModal'
import Image from '../../../Image'
import './pages.css'

export default function InfoPage({
  client, 
  showModal, 
  showClientImageModal, 
  closeImageModal,
  uploadPhoto, 
  imageData,
  showWarningDeleteModalImageImageId,
  openWarningDeleteModalImage,
  onImageDelete
}){


  return (
    <div className="infoPage" style={{ display: 'flex' }}>
      <div style={{ marginRight: '20%', marginLeft: "4%"}}>
        <h1 style={{color: 'white'}}>Contact</h1>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '5px', }}>
            <h3 style={{textAlign: 'left', color: 'white'}}>Name</h3> 
            <h3 style={{gridColumn: '1/1', gridRow: '2', textAlign: 'left', color: 'white'}}>Number</h3> 
            <h3 style={{gridColumn: '1/1', gridRow: '3', textAlign: 'left', color: 'white'}}>Email</h3> 
            <p className="infoPageP" style={{marginTop: 'auto', fontSize: '1.2em'}}>{client.firstname + " " + client.lastname}</p>
            <p className="infoPageP" style={{marginTop: 'auto', fontSize: '1.2em'}}>{client.phone}</p>
            <p className="infoPageP" style={{marginTop: 'auto', fontSize: '1.2em'}}>{client.email}</p>
        </div>
      </div>
      <ClientImageModal
        showClientImageModal={ showClientImageModal }
        closeImageModal={ closeImageModal }
        uploadPhoto={ uploadPhoto }
        clientId={ client._id } 
      />
        <div>
          <h1 style={{color: 'white'}}>ID</h1>
          {
          imageData.map((image) => (
            <Image
              key={ image._id }
              image={image}
              openWarningDeleteModalImage={ () => openWarningDeleteModalImage(image._id)}
              openWarningImageModal={ showWarningDeleteModalImageImageId === image._id}
              handleDeleteImage={ onImageDelete }
            />
            ))
          }
        <Button style={{marginTop: "10%"}} type="submit" bsStyle={'primary'} onClick={ () => showModal() }>Add</Button>
      </div>
    </div>
  )
}
