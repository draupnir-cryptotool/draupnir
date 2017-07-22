import React from 'react'
import './staging.css'
import ClientBar from './ClientBar'
import FaPlus from 'react-icons/lib/fa/plus-square'


export default function Staging({
  ausPrices,
  changeRoute,
  clientModal,
  clientPage,
  clients,
  closeImageModal, 
  closeModal,
  expandedClientID,
  handlePdfQuote,
  images,
  onClientBarExpand,
  onOrder,
  onOrderId,
  onRequest,
  onSend,
  orderUserId,
  orders,
  settings,
  showClientImageModal,
  showModal,
  tempOrder,
  uploadPhoto,
}){

  return (
    <div style={{ boxSizing: 'border-box', padding: "3em"}}>
      <div className="addBtn">
        <span style={{color: 'white'}} onClick={() => (clientModal())}><FaPlus size={35}/></span>
      </div>
      <div id="clientBarTitle" className="clientTitle" style={{display: 'flex', justifyContent: 'center',                                                                marginLeft: "10%"}}>
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
            onOrder={ onOrder }
            onOrderId={ onOrderId }
            onSend={ onSend }
            orderUserId={ orderUserId }
            orders={ orders }
            settings={ settings }
            showClientImageModal={showClientImageModal}
            showModal={ showModal }
            status={ client.status }
            tempOrder={ tempOrder }
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
