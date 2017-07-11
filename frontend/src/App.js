import React, { Component } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import LogInform from './components/logIn/LogInForm';
import Header from './components/Header';
import MainNav from './components/MainNav';
import * as authAPI from './api/auth';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class App extends Component {
  state = {
    token: null
  }

  handleRegistration = ({email, firstname, lastname, password}) => {
    authAPI.register({email, firstname, lastname, password})
    .then(json => {
      this.setState({ token: json.token })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  handleSignIn = ({email, password, OTP}) => {
    authAPI.signIn({email, password, OTP})
    .then(json => {
      this.setState({ token: json.token })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  render() {
    const { token } = this.state
    return (
      <Router>
        <main>
          <Route exact path='/login' render={() => (
            <div>
            <LogInform onSignIn={ this.handleSignIn } />
            </div>
          )
          }/>
          <Route path='/home' render={() => (
            <div>
              <Header />
              <MainNav />
            </div>
          )
          } />
        </main>
      </Router>
    );
  }
}

export default App;
// <RegistrationForm onRegistration={ this.handleRegistration } />