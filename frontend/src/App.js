import React, { Component } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm'
import SignInform from './components/SignInForm';
import Header from './components/Header';
import MainNav from './components/MainNav';


class App extends Component {
  state = {
    token: null
  }

  render() {
    const { token } = this.state
    return (
      <main>
        <RegistrationForm />
        <SignInform />
        <Header />
        <MainNav />
      
      </main>
    );
  }
}

export default App;
