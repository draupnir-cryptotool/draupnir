import React from 'react'
import { UnmountClosed as Collapse } from 'react-collapse'
import StatusPage from './pages/StatusPage'
import InfoPage from './pages/InfoPage'
import OrdersPage from './pages/OrdersPage'
import LogsPage from './pages/LogsPage'
import NotesPage from './pages/NotesPage'
import OrderPage from './pages/OrderPage'
import QuotePage from './pages/QuotePage'
import './staging.css'

export default function ClientExpand({
  ausPrices,
  changeRoute,
  client,
  clientId,
  clientOrders,
  clientPage,
  closeImageModal,
  closeModal,
  expanded,
  handleCreateOrder,
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
  const navStyle={ color: "#000000", textDecoration: "none", fontSize: "20px" }
  return (
      <div>
        <Collapse isOpened={ expanded } fixedHeight={400} style={{width: "90%", backgroundColor: "#3B3B3B", margin: "0 auto"}}>
        <div>
          <nav style={{ backgroundColor: "#C4C4C4" }}>
            <a style={ navStyle } onClick={ () => changeRoute('status')}>STATUS</a>
            <a style={ navStyle } onClick={ () => changeRoute('info') }>INFO</a>
            <a style={ navStyle } onClick={ () => changeRoute('notes') }>NOTES</a>
            <a style={ navStyle } onClick={ () => changeRoute('logs') }>LOGS</a>
            <a style={ navStyle } onClick={ () => changeRoute('order') }>ORDER</a>
            <a style={ navStyle } onClick={ () => changeRoute('quotes') }>QUOTES</a>
            <a style={ navStyle } onClick={ () => changeRoute('orders') }>ORDERS</a>
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
            <h1 style={{ color: "#FFFFFF" }}>Notes</h1>
            :
            clientPage === 'logs' ?
            <h1 style={{ color: "#FFFFFF" }}>Logs</h1>
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
            clientPage === 'orders' ?
            <OrdersPage
              client={ client }
              clientOrders={ clientOrders }
              handleCreateOrder={ handleCreateOrder }
            />
            :
            ""
          }
        </div>
        </Collapse>
      </div>
  )
}
