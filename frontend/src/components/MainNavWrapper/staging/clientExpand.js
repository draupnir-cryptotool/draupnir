import React from 'react'
import { UnmountClosed as Collapse } from 'react-collapse'
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
  handleDeleteOrder,
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
  showWarningDeleteModalOrder,
  warningDeleteModal,
  showModal,
  status,
  tempOrder,
  uploadPhoto,
  onUpdateStatusTrue,
  onUpdateStatusFalse
}) {
  
  return (
      <div>
        <Collapse isOpened={ expanded } fixedHeight={400} style={{width: "90%", backgroundColor: "#3B3B3B", margin: "0 auto"}}>
        <div>
          <nav className="clientExpandSelection" style={{ backgroundColor: "#C4C4C4" }}>
            <a onClick={ () => changeRoute('info') }>INFO</a>
            <a onClick={ () => changeRoute('notes') }>NOTES</a>
            <a onClick={ () => changeRoute('logs') }>LOGS</a>
            <a onClick={ () => changeRoute('quotes') }>QUOTES</a>
            <a onClick={ () => changeRoute('orders') }>ORDERS</a>
          </nav>
          {
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
              handleDeleteOrder={ handleDeleteOrder }
              onUpdateStatusTrue= { onUpdateStatusTrue }
              onUpdateStatusFalse={ onUpdateStatusFalse }
              showWarningDeleteModalOrder={ showWarningDeleteModalOrder }
              warningDeleteModal={ warningDeleteModal }
            />
            :
            ""
          }
        </div>
        </Collapse>
      </div>
  )
}
