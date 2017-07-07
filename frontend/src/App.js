import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import MainNav from './components/MainNav'

class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <MainNav />
      
      </main>
    );
  }
}

export default App;
