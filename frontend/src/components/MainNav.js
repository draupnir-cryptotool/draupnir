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
          <div style={{ marginTop: '6%'}}>
            <Link style={style} to={'/staging'}> Staging </Link>
            <Link style={style} to={'/messages'}> Messages </Link>
            <Link style={style} to={'/logs'}> Logs </Link>
            <Link style={style} to={'/graphs'}> Graphs </Link>
            <Link style={style} to={'/settings'}> Settings </Link>
          </div>
          <Route path='/staging' render={ () => (
            <Staging />
          )
          } />
          <Route path='/messages' render={() => (
            <Messages />
          )
          } />
          <Route path='/logs' render={() => (
            <Logs />
          )
          } />
          <Route path='/Graphs' render={() => (
            <Graphs />
          )
          } />
          <Route path='/settings' render={() => (
            <Settings />
          )
          } />
        </div>
      </Router>
    )
  }
}

export default MainNav
