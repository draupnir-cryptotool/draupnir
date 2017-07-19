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
  settings, onUpdate, clientModal, clients, 
  expandedClientID, onClientBarExpand, clientPage, 
  changeRoute, orders, showModal, tempOrder, onOrder,
  closeModal, showClientImageModal, closeImageModal, uploadPhoto,
  images, onOrderId, orderUserId
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
            clientModal={ clientModal } 
            clients={ clients }
            expandedClientID={ expandedClientID }
            onClientBarExpand={ onClientBarExpand } 
            clientPage={ clientPage }
            changeRoute={ changeRoute }
            orders={ orders }
            onUpdate={ onUpdate }
            settings={ settings }
            showModal={ showModal }
            closeModal={ closeModal }
            showClientImageModal={showClientImageModal}
            closeImageModal={closeImageModal}
            uploadPhoto={uploadPhoto}
            images={images}
            tempOrder={ tempOrder }
            onOrder={ onOrder }
            onOrderId={ onOrderId }
            orderUserId={ orderUserId }
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