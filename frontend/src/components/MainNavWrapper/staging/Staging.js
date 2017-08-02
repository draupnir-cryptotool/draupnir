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
  onDeleteClient,
  onUpdateStatusTrue,
  onUpdateStatusFalse,
  showWarningDeleteModalClientClientId,
  showWarningDeleteModalOrderOrderId,
  showWarningDeleteModalImageImageId,
  openWarningDeleteModalClient,
  openWarningDeleteModalOrder,
  openWarningDeleteModalImage,
  onImageDelete
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
            closeImageModal={ closeImageModal }
            firstname={ client.firstname } 
            handleCreateOrder={ handleCreateOrder }
            handleDeleteOrder={ handleDeleteOrder }
            handlePdfQuote={ handlePdfQuote }
            id={ client._id } 
            images={images}
            key={ client._id } 
            lastname={ client.lastname }
            onExpand={ (e) => onClientBarExpand(e, client._id) }
            expanded={ expandedClientID === client._id }
            openWarningDeleteModalClient={ () => (openWarningDeleteModalClient(client._id)) }
            openWarningClientModal={ showWarningDeleteModalClientClientId === client._id }
            openWarningDeleteModalOrder={ openWarningDeleteModalOrder }
            showWarningDeleteModalOrderOrderId={ showWarningDeleteModalOrderOrderId }
            showWarningDeleteModalImageImageId={ showWarningDeleteModalImageImageId }
            openWarningDeleteModalImage={ openWarningDeleteModalImage }
            onOrder={ onOrder }
            onOrderId={ onOrderId }
            onSend={ onSend }
            orderUserId={ orderUserId }
            orders={ orders }
            settings={ settings }
            showClientImageModal={ showClientImageModal }
            showModal={ showModal }
            status={ client.status }
            tempOrder={ tempOrder }
            uniqId={ client.uniqId } 
            uploadPhoto={uploadPhoto}
            onUpdateStatusTrue={ onUpdateStatusTrue }
            onUpdateStatusFalse={ onUpdateStatusFalse }
            onDeleteClient={ onDeleteClient }
            onImageDelete={ onImageDelete }
          />
        ))
        :
        ""
      }
    </div>
  )
}
