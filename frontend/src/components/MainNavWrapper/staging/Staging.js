import React from 'react'
import './staging.css'
import ClientBar from './ClientBar'
import FaPlus from 'react-icons/lib/fa/plus-square'


export default function Staging({
  ausPrices,
  changeRoute,
  clientModal,
  clientOrders,
  clientPage,
  clients,
  closeImageModal, 
  closeModal,
  expandedClientID,
  handleCreateOrder,
  handleDeleteOrder,
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
  onDeleteClient
}){

  return (
    <div style={{ boxSizing: 'border-box', padding: "3em"}}>
      
      <div id="clientBarTitle" className="clientTitle" style={{display: 'flex', justifyContent: 'center',                                                                marginLeft: "10%", marginTop: "0"}}>
        <div><p style={{ marginTop: "3%" }}>CLIENT No.</p></div>
        <div><p style={{ marginTop: "3%" }}>NAME</p></div>
        <div><p style={{ marginTop: "3%" }}>ACTIVE ORDERS</p></div>
        <div><p style={{ marginTop: "3%" }}>CURRENCY</p></div>
        <span style={{color: 'white'}} onClick={() => (clientModal())}><FaPlus size={35}/></span>
      </div>
      {
        !!clients ? clients.map((client) => (
          <ClientBar 
            ausPrices={ ausPrices }
            changeRoute={ changeRoute }
            client={ client }
            clientOrders={ clientOrders }
            clientPage={ clientPage }
            closeImageModal={closeImageModal}
            closeModal={ closeModal }
            expanded={ expandedClientID === client._id }
            firstname={ client.firstname } 
            handleCreateOrder={ handleCreateOrder }
            handleDeleteOrder={ handleDeleteOrder }
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
            uploadPhoto={ uploadPhoto }
            onDeleteClient={ onDeleteClient }
          />
        ))
        :
        ""
      }
    </div>
  )
}
