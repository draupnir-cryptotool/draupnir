import React from 'react'
import { BrowserRouter as Router, Route, NavLink as Link } from 'react-router-dom'
import Staging from '../components/MainNavWrapper/staging/Staging'
import Messages from '../components/MainNavWrapper/Messages'
import Logs from '../components/MainNavWrapper/Logs'
import Graphs from '../components/MainNavWrapper/Graphs'
import Settings from '../components/MainNavWrapper/settings/Settings'
import './component.css'
import './mainNav.css'

const style = {
    margin: '3.5%',
    fontSize: '2.5rem',
    textDecoration: 'none'
  }

export default function MainNav({
  settings, onUpdate, clientModal, clients, 
  expandedClientID, onClientBarExpand, clientPage, 
  changeRoute, orders, showModal,
  closeModal, showClientImageModal, closeImageModal, uploadPhoto,
  images
}) {
  return (
    <Router>
      <div>
        <div className="mainNav" style={{ marginTop: '6%', border: 'solid 1px' }}>
          <div className="mainNavLink">
            <Link to={'/home/staging'} activeStyle={{ color: 'white'}}> Staging </Link>
            <Link to={'/home/messages'} activeStyle={{ color: 'white'}}> Messages </Link>
            <Link to={'/home/logs'} activeStyle={{ color: 'white'}}> Logs </Link>
            <Link to={'/home/graphs'} activeStyle={{ color: 'white'}}> Graphs </Link>
            <Link to={'/home/settings'} activeStyle={{ color: 'white'}}> Settings </Link>
          </div>          
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