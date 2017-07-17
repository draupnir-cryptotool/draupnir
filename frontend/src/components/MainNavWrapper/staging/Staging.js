import React from 'react'
import './staging.css'
import ClientBar from './ClientBar'


export default function Staging({
  clientModal, clients, expandedClientID, 
  onClientBarExpand, clientPage, changeRoute,
  orders, settings, onRequest, tempOrder, showModal,
  closeModal, showClientImageModal, closeImageModal, 
  uploadPhoto, images
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
      {
        !!clients ? clients.map((client) => (
          <ClientBar 
            key={ client._id } 
            id={ client._id } 
            uniqId={ client.uniqId } 
            firstname={ client.firstname } 
            lastname={ client.lastname }
            status={ client.status }
            expanded={ expandedClientID === client._id }
            onExpand={ () => onClientBarExpand(client._id) }
            clientPage={ clientPage }
            changeRoute={ changeRoute }
            orders={ orders }
            settings={ settings }
            onRequest={ onRequest }
            tempOrder={ tempOrder }
            client={ client }
            settings={ settings }
            onRequest={ onRequest }
            tempOrder={ tempOrder }
            client={ client }
            showModal={ showModal }
            closeModal={ closeModal }
            showClientImageModal={showClientImageModal}
            closeImageModal={closeImageModal}
            uploadPhoto={uploadPhoto}
            images={images}
          />
        ))
        :
        ""
      }
    </div>
  )
}
