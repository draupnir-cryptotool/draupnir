import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import _ from 'lodash'
import Staging from '../components/MainNavWrapper/Staging'
import Messages from '../components/MainNavWrapper/Messages'
import Logs from '../components/MainNavWrapper/Logs'
import Graphs from '../components/MainNavWrapper/Graphs'
import Settings from '../components/MainNavWrapper/Settings'

// Navigate between app wide pages
class MainNav extends React.Component {
  render() {
  const style = {
    margin: '3.5%',
    fontSize: '2.5rem',
    textDecoration: 'none'
  }
    return (
      <Router>
        <div>
          <div style={{ marginTop: '6%', height: '4.5em', border: 'solid 1px', padding: '14px'}}>
            <Link style={style} to={'/home/staging'}> Staging </Link>
            <Link style={style} to={'/home/messages'}> Messages </Link>
            <Link style={style} to={'/home/logs'}> Logs </Link>
            <Link style={style} to={'/home/graphs'}> Graphs </Link>
            <Link style={style} to={'/home/settings'}> Settings </Link>
          </div>
          <Route path='/home/staging' render={ () => (
            <div>
              <div style={{ display: 'flex' }}>
                <li>CLIENT No.</li>
                <li>NAME</li>
                <li>DEPOSIT</li>
                <li>CURRENCY</li>
              </div>
            <Staging />
            </div>
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
            <Settings />
          )
          } />
        </div>
      </Router>
    )
  }
}

export default MainNav
