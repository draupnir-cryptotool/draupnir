import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import _ from 'lodash'


// Navigate between app wide pages
class MainNav extends React.Component {
  render() {
  const style = {
    margin: '5px',
    fontSize: '2.5rem',
    textDecoration: 'none'
  }
    return (
      <Router>
        <div>
          <div>
            <Link style={style} to={'#'}> Staging </Link>
            <Link style={style} to={'#'}> Messages </Link>
            <Link style={style} to={'#'}> Logs </Link>
            <Link style={style} to={'#'}> Graphs </Link>
            <Link style={style} to={'#'}> Settings </Link>
          </div>
        </div>
      </Router>
    )
  }
}

export default MainNav