import React from 'react'
import './staging.css'
import ClientExpand from './clientExpand'

export default function ClientBar({
  client, uniqId, firstname, lastname,
  expanded = false, onExpand, clientPage, changeRoute,
  orders, id, status, settings, onRequest, tempOrder,
  showModal, closeModal, showClientImageModal, closeImageModal,
  uploadPhoto, image
}) {
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
            onRequest={ onRequest }
            tempOrder={ tempOrder }
            client={ client }
            showModal={ showModal }
            closeModal={ closeModal }
            showClientImageModal={showClientImageModal}
            closeImageModal={closeImageModal}
            uploadPhoto={uploadPhoto}
            image={image}
          />
        </div>
    </div>
  )
}
