import React, { Component } from 'react';
import './App.css';
import LogInform from './components/logIn/LogInForm';
import Header from './components/Header';
import MainNav from './components/MainNav';
import Order from './components/Order';
import Image from './components/Image';
import * as authAPI from './api/auth';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import * as walletApi from './api/wallet'
import * as livePriceApi from './api/livePrice'
import * as settingsAPI from './api/settings'
import * as clientAPI from './api/client'
import * as orderAPI from './api/order'
import ClientModal from './components/Modal/ClientModal'

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
    showModal: false,
    clients: null,
    clientPage: null,
    orders: null,
    masterSettings: {
      settings: 0
    },
    expandedClientID: null,
    tempOrder: null

  }

  // Fetching best order rates from exchanges
  handleQueryOrder =({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit }) => {
    orderAPI.queryOrder({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit })
    .then(json => {
      this.setState({ tempOrder: json })
    })
    .catch(error => {
      this.setState({ error })
    })
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

  handleUpdateSettings = ({ bitfinexFloat, btceFloat, bitstampFloat }) => {
    settingsAPI.updateSettings({ bitfinexFloat, btceFloat, bitstampFloat })
    .then(json => {
      this.setState((prevState) => {
        return {
          masterSettings: json
        }
      })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  // create a new client
  handleCreateClient = ({ firstname, lastname, email, phone }) => {
    clientAPI.createClient({firstname, lastname, email, phone})
    .then(newClient => {
      this.setState((prevState) => {
        return {
          clients: prevState.clients.concat(newClient)
        }
      })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  // get all clients
  fetchAllClients = () => {
    clientAPI.allClients()
    .then(clients => {
      this.setState({ clients })
    })
  }

  // get all orders
  fetchAllOrders = () => {
    orderAPI.allOrders()
    .then(orders => {
      this.setState({ orders })
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
      .then(masterSettings => {
        this.setState({ masterSettings })
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
// controls modal
  handleOpenClientModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  // Expands client bar
  onSwitchClientBar = (clientID) => {
    this.setState((prevState) => ({
      expandedClientID:
        (prevState.expandedClientID === clientID) ? null : clientID
    }))
  }

  onClientPageRoute = (route) => {
    this.setState({ clientPage: route })
  }

  render() {
    const { error, token, currentCurrency, bitcoinBalance, ethereumBalance, bitfinexBitcoinPrice,
            bitfinexEthPrice, btceBitcoinPrice, btceEthPrice, bitstampBitcoinPrice, masterSettings, 
            showModal, clients, expandedClientID, clientPage, orders, tempOrder } = this.state
    return (
      <Router>
        <main>
        <Route exact path='/login' render={() => (
          <div>
          { !!error && <p>{ error.message }</p> }
      
          <LogInform onSignIn={ this.handleSignIn } />
          </div>
        )
        }/>
        <Route path='/home' render={() => (

          <div>
            <div>
            {
            !!bitcoinBalance && !!ethereumBalance && !!!!bitfinexBitcoinPrice &&
            !!bitfinexEthPrice && !!btceBitcoinPrice && !!btceEthPrice && !!bitstampBitcoinPrice && !!masterSettings ? (
              <Header 
                settings={ masterSettings }
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
            {
              !!masterSettings.bitfinexFloat && !!masterSettings.btceFloat && !!masterSettings.bitstampFloat ? (
              <MainNav
                settings={ masterSettings }
                onRequest={ this.handleQueryOrder }
                onUpdate={ this.handleUpdateSettings }
                clientModal={ this.handleOpenClientModal }
                clients={ clients }
                expandedClientID={ expandedClientID }
                onClientBarExpand={ this.onSwitchClientBar}
                clientPage={ clientPage }
                changeRoute={ this.onClientPageRoute }
                orders={ orders }
                tempOrder= { tempOrder}
              /> ) : (
                <p>loading..</p>
              )

            }
            </div>
            <ClientModal showModal={showModal} closeModal={ this.handleCloseModal } createClient={ this.handleCreateClient }/>
          </div>
        )
        } />
        <Route path='/order' render={() => (

          <div>
            <Order />
          </div>
        )
      } />
      <Route path='/image' render={() => (
          
          <div>
            <Image />
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
    this.fetchAllClients()
    this.fetchAllOrders()
  }
}

export default App;
// <RegistrationForm onRegistration={ this.handleRegistration } />
