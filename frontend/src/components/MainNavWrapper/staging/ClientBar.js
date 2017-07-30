import React from 'react'
import _ from 'lodash'
import './staging.css'
import './modal.css'
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
  showWarningDeleteModalClient,
  showWarningDeleteModalOrder,
  onUpdateStatusTrue,
  onUpdateStatusFalse,
  openWarningDeleteModal,
  openWarningClientModal
}) {

const imageDataFind = ((images, id) => {
  if(!!images) {
  return images.filter((clientImages) => clientImages.clientId === id
  )}
})

  const showModalStateName = "showWarningDeleteModalClient" //name of state that shows this modal

  const imageData = imageDataFind(images, id)
  return(
    <div className="clientBar">
        <div>
          <div style={{ border: "solid 1px #3B3B3B" , margin: "2em 0 0", backgroundColor: "#3B3B3B", color: "#969696", display: "flex" }}>
            {
<<<<<<< HEAD
              clientOrders.map((order) => (
                !!_.includes(order.status, false) && order.clientId === client._id ?
              <div key={ order._id } style={{ flexDirection: "row", width: "1%", backgroundColor: "#CB2424" }}></div> :
              <div key={ order._id } style={{ flexDirection: "row", width: "1%", backgroundColor: "#4CC941" }}></div>
=======
              clientOrders.map((clientOrder) => (
                !!_.includes(clientOrder.status, false) && clientOrder.clientId === client._id ?
              <div style={{flexDirection: "row", width: "1%", backgroundColor: "#CB2424"}}></div> :
              <div style={{flexDirection: "row", width: "1%", backgroundColor: "#4CC941"}}></div>
>>>>>>> master
              ))
            }
            
            <div onClick={ onExpand } id="clientBarTitle" style={{flexDirection: "row", width: "90%", marginLeft: "8%"}}>
              <div><p>{ uniqId }</p></div>
              <div><p>{ firstname + " " + lastname }</p></div>
              <div><p>Active Orders</p></div>
              <div><p>BTC</p></div>
            </div>
              <span onClick={ openWarningDeleteModal } style={{ position: 'absolute', right: '4em', marginTop: '0.7em'}}>{<DeleteIcon size={25}/>}</span>
          </div>
          <WarningDeleteModal
            showWarningDeleteModal={ openWarningClientModal }
            warningDeleteModal={ openWarningDeleteModal }
            deleteFunction={ onDeleteClient }
            model={ 'client' }
            showModalStateName={ showModalStateName }
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
            showWarningDeleteModalOrder={ showWarningDeleteModalOrder }
            warningDeleteModal={ warningDeleteModal }
          />
        </div>
    </div>
  )
}
