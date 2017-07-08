import React, { Component } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import SignInform from './components/SignInForm';
import Header from './components/Header';
import MainNav from './components/MainNav';
import * as authAPI from './api/auth';


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

  handleSignIn = ({email, password}) => {
    authAPI.signIn({email, password})
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
      <main>
      {
        !!token? (
          <p>Welcome</p>
      ) : (
        <div>
          <RegistrationForm onRegistration={ this.handleRegistration } />
          <SignInform onSignIn={ this.handleSignIn } />
        </div>
      )
      }
        
        <Header />
        <MainNav />
      
      </main>
    );
  }
}

export default App;
