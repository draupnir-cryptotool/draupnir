import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Staging from '../components/MainNavWrapper/Staging'
import Messages from '../components/MainNavWrapper/Messages'
import Logs from '../components/MainNavWrapper/Logs'
import Graphs from '../components/MainNavWrapper/Graphs'
import Settings from '../components/MainNavWrapper/Settings'

const style = {
    margin: '3.5%',
    fontSize: '2.5rem',
    textDecoration: 'none'
  }

export default function MainNav({
  settings, onUpdate
}) {
  return (
    <Router>
      <div>
        <div style={{ marginTop: '6%'}}>
          <Link style={style} to={'/home/staging'}> Staging </Link>
          <Link style={style} to={'/home/messages'}> Messages </Link>
          <Link style={style} to={'/home/logs'}> Logs </Link>
          <Link style={style} to={'/home/graphs'}> Graphs </Link>
          <Link style={style} to={'/home/settings'}> Settings </Link>
        </div>
        <Route path='/home/staging' render={ () => (
          <Staging />
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