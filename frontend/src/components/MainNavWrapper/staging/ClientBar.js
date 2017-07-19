import React from 'react'
import './staging.css'
import ClientExpand from './clientExpand'
import _ from 'lodash'

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
  onRequest,
  onSend,
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
    return _.find(images, {clientId: id})
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
            orders={orders}
            onSend={ onSend }
            settings={ settings }
            showClientImageModal={showClientImageModal}
            showModal={ showModal }
            status={ status }
            uniqId={ uniqId }
            uploadPhoto={uploadPhoto}
          />
        </div>
    </div>
  )
}
