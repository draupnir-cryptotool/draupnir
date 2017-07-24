import React, { Component } from 'react';
import './App.css';
import * as ausPricesAPI from './api/ausPrices'
import * as authAPI from './api/auth';
import * as clientAPI from './api/client'
import * as imageAPI from './api/image'
import * as livePriceApi from './api/livePrice'
import * as mailAPI from './api/mail'
import * as orderAPI from './api/order'
import * as pdfQuoteAPI from './api/pdfQuote'
import * as settingsAPI from './api/settings'
import * as messageAPI from './api/message'
import ClientImageModal from './components/Modal/ClientImageModal'
import ClientModal from './components/Modal/ClientModal'
import Header from './components/Header';
import Order from './components/Order'
import Image from './components/Image';
import LogInform from './components/logIn/LogInForm';
import Mail from './components/Mail';
import MainNav from './components/MainNav';
import PdfForm from './components/pdfForm';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class App extends Component {
  state = {
    token: null,
    error: null,
    currentCurrency: 'usd',
    ausPrices: null,
    bitcoinBalance: null,
    ethereumBalance: null,
    bitfinexBitcoinPrice: null,
    bitfinexEthPrice: null,
    btceBitcoinPrice: null,
    btceEthPrice: null,
    bitstampBitcoinPrice: null,
    showModal: false,
    showClientImageModal: false,
    clients: null,
    clientPage: null,
    orders: null,
    images: null,
    masterSettings: null,
    expandedClientID: null,
    tempOrder: null,
    orderUserId: null,
    adminMessages: null,
    currentUser: null,
  }

  // Fetching best order rates from exchanges
  handleQueryOrder = ({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit }) => {
    orderAPI.queryOrder({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit })
    .then(json => {
      this.setState({ tempOrder: json })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  // Sending Email via Mailgun
  handleSendMail = (emailProps) => {
    mailAPI.sendMail(emailProps)
  }

  // upload image form
    handleUploadPhoto = ({ file, idType, clientId }) => {
      imageAPI.createImage({ file, idType, clientId })
      .then(image => {
        this.setState((prevState) => {
          return {
            images: prevState.images.concat(image)
          }
        })
      })
      .catch(error => {
        this.setState({ error })
      })
    }

// HANDLER SECTION -------------------------------------------------------------------------
  handleCreateMessage = ({ from, message  }) => { // toRole will be Admin || Client
    messageAPI.createMessage({ from, message })
    .then((newMessage) => {
      if(newMessage.for.role === 'admin') {
        this.setState((prevState) => {
        const newState = prevState.adminMessages
        newState.unshift(newMessage)
          return {
            adminMessages: newState
          }
        })
      }
    })
    .catch((err) => {
      this.setState({error: err})
    })
  }

  handleUpdateStatus = ({ clientId, statusType }) => {
    clientAPI.updateVerified({ clientId, statusType })
    .then((updatedClient) => {
      this.setState(({ clients }) => {
        return {
          clients: clients.map(client => (
            (client._id === updatedClient._id) ? updatedClient : client
          ))
        }
      })
    })
    .catch((err) => {
      this.setState({error: err})
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

  // Update float balances from three exhcanges
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

  // Update btc wallet address and render new balance
  updateBitcoinWalletAddress = ({ btceWalletAddress }) => {
    settingsAPI.updateSettings({ btceWalletAddress })
    .then(json => {
      settingsAPI.fetchBitcoinPrice()
      .then(bitcoinBalance => {
        this.setState({ bitcoinBalance })
      })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  // update eth wallet addres and render new balance 
  updateEthereumWalletAddress = ({ ethWalletAddress }) => {
    settingsAPI.updateSettings({ ethWalletAddress })
    .then(json => {
      settingsAPI.fetchEthereumPrice()
      .then(ethereumBalance => {
        this.setState({ ethereumBalance })
      })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  handlePdfQuote = ({ exchange1 }) => {
    pdfQuoteAPI.generatePdf({ exchange1 })
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

// FETCH SECTION ---------------------------------------------------------
// fetch logged in Admins details
fetchSignedInAdminDetails = () => {
  const token = this.state.token
  authAPI.signedInAdminDetails({ token })
  .then((adminDetails) => {
    this.setState({ currentUser: adminDetails })
  })
  .catch((err) => {
    this.setState({error: err})
  })
}

// get all messages
fetchAllAdminMessages = () => {
  messageAPI.allAdminMessages()
  .then((adminMessages) => {
  this.setState({ adminMessages: adminMessages.reverse() })
})
}

// get all image data
  fetchImagesData = () => {
    imageAPI.allImageData()
    .then((allImages) => {
      this.setState({images: allImages})
    })
  }

  // get all clients
  fetchAllClients = () => {
    clientAPI.allClients()
    .then(clients => {
      this.setState({ clients })
    })
  }

  fetchAusPrices = () => {
    ausPricesAPI.ausPrices()
      .then(prices => {
        this.setState({ ausPrices: prices })
        // fetch data from api every 10 seconds
        setTimeout(this.fetchAusPrices, 10000)
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
    settingsAPI.fetchBitcoinPrice()
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
    settingsAPI.fetchEthereumPrice()
      .then(ethereumBalance => {
        this.setState({ ethereumBalance })
      })
      .catch(error => {
        this.setState({ error })
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

  handleSetOrderId = ({reqId}) => {
    this.setState({ orderUserId: reqId })
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
// controls new client modal
  handleOpenClientModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  handleOpenClientImageModal = () => {
    this.setState({ showClientImageModal: true })
  }
  
  handleCloseClientImageModal = () => {
    this.setState({showClientImageModal: false})
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
    const { 
      ausPrices,
      bitcoinBalance,
      bitfinexBitcoinPrice,
      bitfinexEthPrice,
      bitstampBitcoinPrice,
      btceBitcoinPrice,
      btceEthPrice,
      clientPage,
      clients,
      currentCurrency,
      error,
      ethereumBalance,
      expandedClientID,
      images,
      masterSettings,
      orderUserId,
      orders,
      showClientImageModal,
      showModal,
      tempOrder,
      token,
      adminMessages,
      currentUser
    } = this.state
    return (
      <Router>
        <main>
          <Route path='/login' render={() => (
            <div>
              { !!error && <p>{ error.message }</p> }

              {
                !!token ? (
                  <Redirect to='/home' />
                ) : (
                  <LogInform onSignIn={ this.handleSignIn } />
                )
              }
            </div>
            ) 
          }/>
          {
          <Route exact to='/home' render={() => (
            !!token ? (
            <div>
              <div>
              {
              !!bitcoinBalance && !!ethereumBalance && !!!!bitfinexBitcoinPrice &&
              !!bitfinexEthPrice && !!btceBitcoinPrice && !!btceEthPrice && !!bitstampBitcoinPrice && !!masterSettings && !!currentUser ? (
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
                  currentCurrency={ currentCurrency }
                  currentUser={ currentUser }
                /> 
                ) : (
                  <p>loading..</p>
                )
                }  
              </div>
              <div>
              {
                !!masterSettings ? (
                <MainNav
                  ausPrices={ ausPrices }
                  changeRoute={ this.onClientPageRoute }
                  clientModal={ this.handleOpenClientModal }
                  clientPage={ clientPage }
                  clients={ clients }
                  closeImageModal={ this.handleCloseClientImageModal }
                  closeModal={ this.handleCloseClientImageModal}
                  expandedClientID={ expandedClientID }
                  handlePdfQuote={ this.handlePdfQuote }
                  images={ images }
                  onClientBarExpand={ this.onSwitchClientBar}
                  onOrder={ this.handleQueryOrder }
                  onOrderId={ this.handleSetOrderId }
                  onSend={ this.handleSendMail }
                  onUpdate={ this.handleUpdateSettings }
                  orderUserId={ orderUserId }
                  orders={ orders }
                  settings={ masterSettings }
                  showClientImageModal={ showClientImageModal }
                  showModal={ this.handleOpenClientImageModal } 
                  tempOrder={ tempOrder }
                  uploadPhoto={ this.handleUploadPhoto }
                  onBtcUpdate={ this.updateBitcoinWalletAddress }
                  onEthUpdate={ this.updateEthereumWalletAddress }
                  adminMessages={ adminMessages }
                  onCreateMessage={ this.handleCreateMessage }
                  currentUser ={ currentUser }
                />
                  ) : (
                  <p>loading..</p>
                )
              }
              </div>
              <ClientModal showModal={ showModal } closeModal={ this.handleCloseModal } createClient={ this.handleCreateClient }/>
            </div>
            ) : (
              <Redirect to='/login' />
            )
            )} />
          } 
        </main>
      </Router>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { token } = this.state
    const justSignedIn = !!token && (prevState.token != token)

    if (justSignedIn) {
      this.fetchAllClients()
      this.fetchAllOrders()
      this.fetchAusPrices()
      this.fetchBitcoinPrice()
      this.fetchBitfinexBitcoinPrice()
      this.fetchBitfinexEthPrice()
      this.fetchBitstampBitcoinPrice()
      this.fetchBtceBitcoinPrice()
      this.fetchBtceEthPrice()
      this.fetchEthereumPrice()
      this.fetchImagesData()
      this.fetchSettings()
      this.fetchAllAdminMessages()
      this.fetchSignedInAdminDetails()
    }
  }
}

export default App;
// <RegistrationForm onRegistration={ this.handleRegistration } />
