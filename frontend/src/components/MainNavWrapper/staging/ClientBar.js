import React from 'react'
import './staging.css'
import ClientExpand from './clientExpand'
import DeleteIcon from 'react-icons/lib/go/x'
import WarningDeleteModal from '../../Modal/warningDeleteModal'

export default function ClientBar({
  ausPrices,
  changeRoute,
  client,
  clientOrders,
  clientPage,
  closeImageModal,
  closeModal,
  expanded = false,
  firstname,
  handleCreateOrder,
  handleDeleteOrder,
  handlePdfQuote,
  id,
  images,
  lastname,
  onExpand,
  onOrder,
  onOrderId,
  onRequest,
  onSend,
  orderUserId,
  orders,
  settings,
  showClientImageModal,
  showModal,
  status,
  tempOrder,
  uniqId,
  uploadPhoto,
  onDeleteClient,
  warningDeleteModal,
  showWarningDeleteModal,
  onUpdateStatusTrue,
  onUpdateStatusFalse,

}) {

  const imageDataFind = ((images, id) => {
    if(!!images) {
    return images.filter((clientImages) => clientImages.clientId === id
    )}
  })

const modal = "showWarningDeleteModal"

  const imageData = imageDataFind(images, id)
  return(
    <div className="clientBar">
        <div>
          <div style={{ border: "solid 1px #3B3B3B" , margin: "2em 0 0", backgroundColor: "#3B3B3B", color: "#969696", display: "flex" }}>
            <div style={{flexDirection: "row", width: "1%", backgroundColor: "red"}}></div>
            <div onClick={ onExpand } id="clientBarTitle" style={{flexDirection: "row", width: "90%", marginLeft: "8%"}}>
              <div><p>{ uniqId }</p></div>
              <div><p>{ firstname + " " + lastname }</p></div>
              <div><p>Active Orders</p></div>
              <div><p>BTC</p></div>
            </div>
              <span onClick={ () => (warningDeleteModal("showWarningDeleteModal")) } style={{ position: 'absolute', right: '4em', marginTop: '0.7em'}}>{<DeleteIcon size={25}/>}</span>
          </div>
          <WarningDeleteModal
            showWarningDeleteModal={ showWarningDeleteModal }
            warningDeleteModal={ warningDeleteModal }
            onDeleteClient={ onDeleteClient }
            id={ id }
        />
          <ClientExpand 
            ausPrices={ ausPrices }
            changeRoute={ changeRoute}
            client={ client }
            clientId={ id }
            clientOrders={ clientOrders }
            clientPage={ clientPage }
            closeImageModal={closeImageModal}
            closeModal={ closeModal }
            expanded={ expanded } 
            handleCreateOrder={ handleCreateOrder }
            handleDeleteOrder={ handleDeleteOrder }
            handlePdfQuote={ handlePdfQuote }
            imageData={ imageData }
            onOrder={ onOrder }
            onOrderId={ onOrderId }
            onSend={ onSend }
            orderUserId={ orderUserId }
            orders={orders}
            settings={ settings }
            showClientImageModal={showClientImageModal}
            showModal={ showModal }
            status={ status }
            tempOrder={ tempOrder }
            uniqId={ uniqId }
            uploadPhoto={uploadPhoto}
            onUpdateStatusTrue={ onUpdateStatusTrue }
            onUpdateStatusFalse={ onUpdateStatusFalse }
          />
        </div>
    </div>
  )
}
