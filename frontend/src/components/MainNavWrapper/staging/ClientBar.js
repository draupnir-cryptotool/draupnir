import React from 'react'
import './staging.css'
import ClientExpand from './clientExpand'

export default function ClientBar({
  ausPrices,
  changeRoute,
  client,
  clientPage,
  closeImageModal,
  closeModal,
  expanded = false,
  firstname,
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
}) {
  const imageDataFind = ((images, id) => {
    return images.filter((clientImages) => clientImages.clientId === id
    )
  })

  const imageData = imageDataFind(images, id)
  return(
    <div>
        <div>
          <div onClick={ onExpand } style={{ border: "solid 1px", marginTop: "2em" }}>
            <div id="clientBarTitle">
              <div><p>{ uniqId }</p></div>
              <div><p>{ firstname + " " + lastname }</p></div>
              <div><p>$10000</p></div>
              <div><p>BTC-E</p></div>
            </div>
          </div>
          <ClientExpand 
            ausPrices={ ausPrices }
            changeRoute={ changeRoute}
            client={ client }
            clientId={ id }
            clientPage={ clientPage }
            closeImageModal={closeImageModal}
            closeModal={ closeModal }
            expanded={ expanded } 
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
          />
        </div>
    </div>
  )
}
