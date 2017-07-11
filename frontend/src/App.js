import React, { Component } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import LogInform from './components/logIn/LogInForm';
import Header from './components/Header';
import MainNav from './components/MainNav';
import * as authAPI from './api/auth';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import * as walletApi from './api/wallet'
import * as livePriceApi from './api/livePrice'
import * as settingsAPI from './api/settings'

class App extends Component {
  state = {
    token: null,
    error: null,
    currentCurrency: 'usd',
    bitcoinBalance: null,
    ethereumBalance: null,
    bitfinexBitcoinPrice: null,
    bitfinexEthPrice: null,
    btceBitcoinPrice: null,
    btceEthPrice: null,
    bitstampBitcoinPrice: null,
    settings: null
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

  // Get Bitcoin balance from wallet api
  fetchBitcoinPrice = () => {
    // Fetching from axios folder, fetchBitcoinPrice()
    walletApi.fetchBitcoinPrice()
      .then(bitcoinBalance => {
        this.setState({ bitcoinBalance })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  // Get Ethereum balance from wallet api
  fetchEthereumPrice = () => {
    // Fetching from axios folder, fetchBitcoinPrice()
    walletApi.fetchEthereumPrice()
      .then(ethereumBalance => {
        this.setState({ ethereumBalance })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  // get bitcoin/usd price from bitfinex
  fetchBitfinexBitcoinPrice = () => {
    // Fetching from axios folder, fetchBitfinexBitcoinPrice()
    livePriceApi.fetchBitfinexBitcoinPrice()
      .then(bitfinexBitcoinPrice => {
        this.setState({ bitfinexBitcoinPrice })
        // fetch data from api every 10 seconds
        setTimeout(this.fetchBitfinexBitcoinPrice, 10000)
      })
      .catch(error => {
        this.setState({ error })
        setTimeout(this.fetchBitfinexBitcoinPrice, 10000)
      })
  }

  // get eth/usd price from bitfinex
  fetchBitfinexEthPrice = () => {
    // Fetching from axios folder, fetchBitfinexBitcoinPrice()
    livePriceApi.fetchBitfinexEthPrice()
      .then(bitfinexEthPrice => {
        this.setState({ bitfinexEthPrice })
        // fetch data from api every 10 seconds
        setTimeout(this.fetchBitfinexEthPrice, 10000)
      })
      .catch(error => {
        this.setState({ error })
        setTimeout(this.fetchBitfinexEthPrice, 10000)
      })
  }

  // get bitcoin/usd price from BTC-E
  fetchBtceBitcoinPrice = () => {
    // Fetching from axios folder, fetchBtceBitcoinPrice()
    livePriceApi.fetchBtceBitcoinPrice()
      .then(btceBitcoinPrice => {
        this.setState({ btceBitcoinPrice })
        // fetch data from api every 10 seconds
        setTimeout(this.fetchBtceBitcoinPrice, 10000)
      })
      .catch(error => {
        this.setState({ error })
        setTimeout(this.fetchBtceBitcoinPrice, 10000)
      })
  }

  // get eth/usd price from BTC-E
  fetchBtceEthPrice = () => {
    // Fetching from axios folder, fetchBtceEthPrice()
    livePriceApi.fetchBtceEthPrice()
      .then(btceEthPrice => {
        this.setState({ btceEthPrice })
        // fetch data from api every 10 seconds
        setTimeout(this.fetchBtceEthPrice, 10000)
      })
      .catch(error => {
        this.setState({ error })
        setTimeout(this.fetchBtceEthPrice, 10000)
      })
  }

  // get bitcoin/usd price from bitstamp
  fetchBitstampBitcoinPrice = () => {
    // Fetching from axios folder, fetchBitstampBitcoinPrice()
    livePriceApi.fetchBitstampBitcoinPrice()
      .then(bitstampBitcoinPrice => {
        this.setState({ bitstampBitcoinPrice })
        // fetch data from api every 10 seconds
        setTimeout(this.fetchBitstampBitcoinPrice, 10000)
      })
      .catch(error => {
        this.setState({ error })
        setTimeout(this.fetchBitstampBitcoinPrice, 10000)
      })
  }
  // get settings state to update exchange cash balances
  fetchSettings = () => {
    // Fetching from axios folder, fetchSettings()
    settingsAPI.fetchSettings()
      .then(settings => {
        this.setState({ settings })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  onSwitchUSDCurrency = () => {
    this.setState({
      // this.state.items will be changed
      currentCurrency: 'usd'
    })
  }

  onSwitchAUDCurrency = () => {
    this.setState({
      // this.state.items will be changed
      currentCurrency: 'aud'
    })
  }

  render() {
    const { error, token, currentCurrency, bitcoinBalance, ethereumBalance, bitfinexBitcoinPrice,
            bitfinexEthPrice, btceBitcoinPrice, btceEthPrice, bitstampBitcoinPrice, settings } = this.state
    return (
      <Router>
        <main>
        <Route exact path='/login' render={() => (
          <div>
          <LogInform onSignIn={ this.handleSignIn } />
          </div>
        )}/>
        <Route path='/home' render={() => (

          <div>
            <div>
            {
            !!bitcoinBalance && !!ethereumBalance && !!!!bitfinexBitcoinPrice &&
            !!bitfinexEthPrice && !!btceBitcoinPrice && !!btceEthPrice && !!bitstampBitcoinPrice && !!settings ? (
              <Header 
                settings={ settings }
                bitBalance={ bitcoinBalance }
                onBtcUpdate={ this.fetchBitcoinPrice }
                etherBalance={ ethereumBalance }
                onEthUpdate={ this.fetchEthereumPrice }
                bitfinexBtcValue={ currentCurrency === 'usd' ? bitfinexBitcoinPrice.usdPrice : bitfinexBitcoinPrice.audPrice }
                bitfinexEthValue={ currentCurrency === 'usd' ? bitfinexEthPrice.usdPrice : bitfinexEthPrice.audPrice }
                btceBtcValue={ currentCurrency === 'usd' ? btceBitcoinPrice.usdPrice : btceBitcoinPrice.audPrice }
                btceEthValue={ currentCurrency === 'usd' ? btceEthPrice.usdPrice : btceEthPrice.audPrice }
                bitstampBtcValue={ currentCurrency === 'usd' ? bitstampBitcoinPrice.usdPrice : bitstampBitcoinPrice.audPrice }
                onCurrencyChangeUsd={ this.onSwitchUSDCurrency }
                onCurrencyChangeAud={ this.onSwitchAUDCurrency }
              /> 
            ) : (
              <p>loading..</p>
            )
            }  
            </div>
            <div>
              <MainNav />
            </div>
          </div>
        )
        } />
        </main>
      </Router>
    );
  }

  componentDidMount() {
    this.fetchBitcoinPrice()
    this.fetchEthereumPrice()
    this.fetchBitfinexBitcoinPrice()
    this.fetchBitfinexEthPrice()
    this.fetchBtceBitcoinPrice()
    this.fetchBtceEthPrice()
    this.fetchBitstampBitcoinPrice()
    this.fetchSettings()
  }
}

export default App;
// <RegistrationForm onRegistration={ this.handleRegistration } />