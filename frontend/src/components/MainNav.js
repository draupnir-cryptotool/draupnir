import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Staging from '../components/MainNavWrapper/staging/Staging'
import Messages from '../components/MainNavWrapper/Messages'
import Logs from '../components/MainNavWrapper/Logs'
import Graphs from '../components/MainNavWrapper/Graphs'
import Settings from '../components/MainNavWrapper/settings/Settings'
import './component.css'

const style = {
    margin: '3.5%',
    fontSize: '2.5rem',
    textDecoration: 'none'
  }

export default function MainNav({
  ausPrices,
  changeRoute,
  clientModal,
  clientPage,
  clients,
  closeImageModal,
  closeModal,
  expandedClientID,
  handlePdfQuote,
  images,
  onClientBarExpand,
  onRequest,
  onSend,
  onUpdate,
  orders,
  settings,
  showClientImageModal,
  showModal,
  tempOrder,
  uploadPhoto,
}) {
  return (
    <Router>
      <div>
        <div style={{ marginTop: '6%', border: 'solid 1px' }}>
          <Link to={'/home/staging'}> Staging </Link>
          <Link to={'/home/messages'}> Messages </Link>
          <Link to={'/home/logs'}> Logs </Link>
          <Link to={'/home/graphs'}> Graphs </Link>
          <Link to={'/home/settings'}> Settings </Link>
        </div>
        <Route path='/home/staging' render={ () => (
          <Staging 
            ausPrices={ ausPrices }
            changeRoute={ changeRoute }
            clientModal={ clientModal } 
            clientPage={ clientPage }
            clients={ clients }
            closeImageModal={closeImageModal}
            closeModal={ closeModal }
            expandedClientID={ expandedClientID }
            handlePdfQuote={ handlePdfQuote }
            images={images}
            onClientBarExpand={ onClientBarExpand } 
            onSend={ onSend }
            onUpdate={ onUpdate }
            orders={ orders }
            settings={ settings }
            showClientImageModal={showClientImageModal}
            showModal={ showModal }
            uploadPhoto={uploadPhoto}
          />
        )
        } />
        <Route path='/home/messages' render={() => (
          <Messages />
        )
        } />
        <Route path='/home/logs' render={() => (
          <Logs />
        )
        } />
        <Route path='/home/Graphs' render={() => (
          <Graphs />
        )
        } />
        <Route path='/home/settings' render={() => (
          <Settings
            settings={ settings }
            onUpdate={ onUpdate }
          />
        )
        } />
      </div>
    </Router>
  )
}
