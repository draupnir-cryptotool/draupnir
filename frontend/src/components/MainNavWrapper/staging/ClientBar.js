import React from 'react'
import './staging.css'
import ClientExpand from './clientExpand'
import _ from 'lodash'

export default function ClientBar({
  client, uniqId, firstname, lastname,
  expanded = false, onExpand, clientPage, changeRoute,
  orders, id, status, settings, tempOrder, onOrder,
  showModal, closeModal, showClientImageModal, closeImageModal,
  uploadPhoto, images
}) {
  const imageDataFind = ((images, id) => {
    return _.find(images, {clientId: id})
  })

  const imageData = imageDataFind(images, id)
  console.log(imageData)
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
            expanded={ expanded } 
            clientPage={ clientPage }
            changeRoute={ changeRoute}
            orders={orders}
            uniqId={ uniqId }
            clientId={ id }
            status={ status }
            settings={ settings }
            client={ client }
            showModal={ showModal }
            closeModal={ closeModal }
            showClientImageModal={showClientImageModal}
            closeImageModal={closeImageModal}
            uploadPhoto={uploadPhoto}
            imageData={ imageData }
            tempOrder={ tempOrder }
            onOrder={ onOrder }
          />
        </div>
    </div>
  )
}
