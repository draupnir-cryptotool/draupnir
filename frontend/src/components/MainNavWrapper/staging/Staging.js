import React from 'react'
import './staging.css'
import ClientBar from './ClientBar'


export default function Staging({
  ausPrices,
  changeRoute,
  clientModal,
  clientPage,
  clients,
  closeImageModal, 
  closeModal,
  expandedClientID, 
  handlePdfQuote
  images
  onClientBarExpand,
  onRequest,
  orders,
  settings,
  showClientImageModal,
  showModal,
  tempOrder,
  uploadPhoto,
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
            ausPrices={ ausPrices }
            changeRoute={ changeRoute }
            client={ client }
            clientPage={ clientPage }
            closeImageModal={closeImageModal}
            closeModal={ closeModal }
            expanded={ expandedClientID === client._id }
            firstname={ client.firstname } 
            handlePdfQuote={ handlePdfQuote }
            id={ client._id } 
            images={images}
            key={ client._id } 
            lastname={ client.lastname }
            onExpand={ () => onClientBarExpand(client._id) }
            orders={ orders }
            settings={ settings }
            showClientImageModal={showClientImageModal}
            showModal={ showModal }
            status={ client.status }
            uniqId={ client.uniqId } 
            uploadPhoto={uploadPhoto}
          />
        ))
        :
        ""
      }
    </div>
  )
}
