import React from 'react'
import { UnmountClosed as Collapse } from 'react-collapse'
import StatusPage from './pages/StatusPage'
import InfoPage from './pages/InfoPage'
import LogsPage from './pages/LogsPage'
import NotesPage from './pages/NotesPage'
import OrderPage from './pages/OrderPage'
import QuotePage from './pages/QuotePage'

export default function ClientExpand({
  ausPrices,
  changeRoute,
  client,
  clientId,
  clientPage,
  closeImageModal,
  closeModal,
  expanded,
  handlePdfQuote,
  imageData,
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
  uploadPhoto,
}) {
  return (
      <div>
        <Collapse isOpened={ expanded } fixedHeight={1000}>
        <div>
          <nav>
            <a onClick={ () => changeRoute('status')}>STATUS</a>
            <a onClick={ () => changeRoute('info') }>INFO</a>
            <a onClick={ () => changeRoute('notes') }>NOTES</a>
            <a onClick={ () => changeRoute('logs') }>LOGS</a>
            <a onClick={ () => changeRoute('order') }>ORDER</a>
            <a onClick={ () => changeRoute('quotes') }>QUOTES</a>
          </nav>
          {
            clientPage === 'status' ?
            <StatusPage status={ status }/>
            :
            clientPage === 'info' ?
            <InfoPage 
            client={ client }
            showModal={ showModal }
            closeModal={ closeModal }
            showClientImageModal={showClientImageModal}
            closeImageModal={closeImageModal}
            uploadPhoto={uploadPhoto}
            imageData ={ !!imageData ? imageData : "" } />
            :
            clientPage === 'notes' ?
            <h1>notes</h1>
            :
            clientPage === 'logs' ?
            <h1>logs</h1>
            :
            clientPage === 'order' ?
            <OrderPage
              settings={ settings }
              orders={ orders }
              tempOrder={ tempOrder }
              onOrder={ onOrder }
              client={ client }
              onOrderId={ onOrderId }
              orderUserId={ orderUserId }
            />
            :
            clientPage === 'quotes' ?
            <QuotePage 
              ausPrices={ ausPrices }
              handlePdfQuote={ handlePdfQuote }
              onSend={ onSend }
              client={ client }
              orderUserId={ orderUserId }
            />
            :
            ""
          }
        </div>
        </Collapse>
      </div>
  )
}
