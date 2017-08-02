import React, { Component } from 'react';
import './App.css';
import * as ausPricesAPI from './api/ausPrices';
import * as authAPI from './api/auth';
import * as clientAPI from './api/client';
import * as clientOrdersAPI from './api/clientOrders.js';
import * as imageAPI from './api/image';
import * as livePriceApi from './api/livePrice';
import * as mailAPI from './api/mail';
import * as messageAPI from './api/message';
import * as orderAPI from './api/order';
import * as pdfQuoteAPI from './api/pdfQuote';
import * as settingsAPI from './api/settings';
import ClientImageModal from './components/Modal/ClientImageModal';
import ClientModal from './components/Modal/ClientModal';
import Header from './components/Header';
import LogInform from './components/logIn/LogInForm';
import Mail from './components/Mail';
import MainNav from './components/MainNav';
import Order from './components/Order';
import PdfForm from './components/pdfForm';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  state = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhdEBtYW4uY29tIiwiaGFzVmVyaWZpZWQyRkEiOnRydWUsImlhdCI6MTUwMDc3MjQyOCwiZXhwIjoxNTAwNzc2MDI4LCJzdWIiOiI1OTYyZmY2YjUwMWQxNTY0ODUyMWQ1NDAifQ.iGToIuASfnIpkYU-E1-eoO1jmUUq5n9rU2i7bVZENw8",
    adminMessages: null,
    ausPrices: null,
    bitcoinBalance: null,
    bitfinexBtcValue: null,
    bitfinexEthValue: null,
    bitstampBtcValue: null,
    btceBtcValue: null,
    btceEthValue: null,
    clientOrders: null,
    clientPage: null,
    clients: null,
    currentCurrency: 'usd',
    currentUser: null,
    error: null,
    ethereumBalance: null,
    expandedClientID: null,
    images: null,
    masterSettings: null,
    orderUserId: null,
    orders: null,
    showClientImageModal: false,
    showAddClientModal: false,
    showWarningDeleteModalClientClientId: null,
    showWarningDeleteModalOrderOrderId: null,
    showWarningDeleteModalImageImageId: null,
    tempOrder: null,
  }
// HANDLER SECTION -------------------------------------------------------------------------

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

    handleDeleteImage = ({ id }) => {
      imageAPI.deleteImage({ id })
      .then(deletedImage => {
        this.setState(({ images }) => {
          return {
            images: images.filter((image) => {
              return image._id !== deletedImage._id
            })
          }
        })
      })
      .catch((err) => {
        this.setState({error: err})
      })
    }

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

  handleDeleteMessage = ({ messageId }) => {
    messageAPI.deleteMessage({ messageId })
    .then((deletedMessage) => {
      this.setState(({ adminMessages }) => {
        return {
          adminMessages: adminMessages.filter((message) => {
            return message._id !== deletedMessage._id
          })
        }
      })
    })
    .catch((err) => {
      this.setState({error: err})
    })
  }

  handleUpdateStatusTrue = ({ orderId, statusType }) => {
    clientOrdersAPI.updateVerifiedTrue({ orderId, statusType })
    .then((updatedClientOrder) => {
      this.setState((prevState) => {
        return { 
          clientOrders: prevState.clientOrders.map(clientOrder => (
            (clientOrder._id === updatedClientOrder._id) ? updatedClientOrder : clientOrder
          ))

        }
      })
    })
    .catch((err) => {
      this.setState({error: err})
    })
  }

  handleUpdateStatusFalse = ({ orderId, statusType }) => {
    clientOrdersAPI.updateVerifiedFalse({ orderId, statusType })
    .then((updatedClientOrder) => {
      this.setState((prevState) => {
        return {
          clientOrders: prevState.clientOrders.map(clientOrder => (
            (clientOrder._id === updatedClientOrder._id) ? updatedClientOrder : clientOrder
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

  handleCreateOrder = ({ clientId, amount, coin }) => {
    clientOrdersAPI.createOrder({ clientId, amount, coin })
    .then(newOrder => {
      this.setState((prevState) => {
        return {
          clientOrders: prevState.clientOrders.concat(newOrder)
        }
      })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  handleDeleteOrder = ({ id }) => {
    console.log(`order id to delete ---------${id}`)
    clientOrdersAPI.deleteOrder({ id })
    .catch(error => {
      this.setState({ error })
    })
    .then(() => {
      this.fetchAllClientOrders();
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

  handleDeleteClient = ({ id }) => {
    clientAPI.deleteClient({ id })
    .catch((err) => {
      this.setState({error: err})
    })
    .then(() => {
      this.fetchAllClients()
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
  .catch((err) => {
    this.setState({error: err})
  })
}

fetchAllClientOrders = () => {
  clientOrdersAPI.allClientOrders()
    .then((clientOrders) => {
      this.setState({clientOrders: clientOrders})
    })
    .catch((err) => {
      this.setState({error: err});
    })
}

// get all image data
  fetchImagesData = () => {
    imageAPI.allImageData()
    .then((allImages) => {
      this.setState({images: allImages})
    })
    .catch((err) => {
      this.setState({error: err})
    })
  }

  // get all clients
  fetchAllClients = () => {
    clientAPI.allClients()
    .then(clients => {
      this.setState({ clients })
    })
    .catch((err) => {
      this.setState({error: err})
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
      .then(bitfinexBtcValue => {
        this.setState({ bitfinexBtcValue })
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
      .then(bitfinexEthValue => {
        this.setState({ bitfinexEthValue })
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
      .then(btceBtcValue => {
        this.setState({ btceBtcValue })
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
      .then(btceEthValue => {
        this.setState({ btceEthValue })
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
      .then(bitstampBtcValue => {
        this.setState({ bitstampBtcValue })
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
  handleClientModal = () => {
    this.setState({ showAddClientModal: !this.state.showAddClientModal })
  }

  handleOpenClientImageModal = () => {
    this.setState({ showClientImageModal: true })
  }
  
  handleCloseClientImageModal = () => {
    this.setState({showClientImageModal: false})
  }

  // Expands client bar
  onSwitchClientBar = (e, clientID) => {
    e.preventDefault()
    this.setState((prevState) => ({
      expandedClientID:
        (prevState.expandedClientID === clientID) ? null : clientID
    }))
  }

  onOpenWarningDeleteModalClient = (clientID) => {
    // e.preventDefault()
    this.setState((prevState) => ({
      showWarningDeleteModalClientClientId:
        (prevState.showWarningDeleteModalClientClientId === clientID) ? null : clientID
    }))
  }

  onOpenWarningDeleteModalOrder = (clientID) => {
    // e.preventDefault()
    this.setState((prevState) => ({
      showWarningDeleteModalOrderOrderId:
        (prevState.showWarningDeleteModalOrderOrderId === clientID) ? null : clientID
    }))
  }

  onOpenWarningDeleteModalImage = (clientID) => {
    this.setState((prevState) => ({
      showWarningDeleteModalImageImageId:
        (prevState.showWarningDeleteModalImageImageId === clientID) ? null : clientID
    }))
  }

  onClientPageRoute = (route) => {
    this.setState({ clientPage: route })
  }

  render() {
    const { 
      adminMessages,
      ausPrices,
      bitcoinBalance,
      bitfinexBtcValue,
      bitfinexEthValue,
      bitstampBtcValue,
      btceBtcValue,
      btceEthValue,
      clientOrders,
      clientPage,
      clients,
      currentCurrency,
      currentUser,
      error,
      ethereumBalance,
      expandedClientID,
      handleDeleteOrder,
      images,
      masterSettings,
      orderUserId,
      orders,
      showClientImageModal,
      showWarningDeleteModalClientClientId,
      showWarningDeleteModalOrderOrderId,
      showWarningDeleteModalImageImageId,
      showAddClientModal,
      tempOrder,
      token,
    } = this.state
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
              <Header 
                bitBalance={ bitcoinBalance }
                bitfinexBtcValue={ bitfinexBtcValue }
                bitfinexEthValue={ bitfinexEthValue }
                bitstampBtcValue={ bitstampBtcValue }
                btceBtcValue={ btceBtcValue }
                btceEthValue={ btceEthValue }
                currentCurrency={ currentCurrency }
                currentUser={ currentUser }
                etherBalance={ ethereumBalance }
                onBtcUpdate={ this.fetchBitcoinPrice }
                onCurrencyChangeAud={ this.onSwitchAUDCurrency }
                onCurrencyChangeUsd={ this.onSwitchUSDCurrency }
                onEthUpdate={ this.fetchEthereumPrice }
                settings={ masterSettings }
              /> 
            </div>
            <div>
            {
              !!masterSettings ? (
              <MainNav
                adminMessages={ adminMessages }
                ausPrices={ ausPrices }
                changeRoute={ this.onClientPageRoute }
                clientModal={ this.handleClientModal }
                clientOrders={ clientOrders }
                clientPage={ clientPage }
                clients={ clients }
                closeImageModal={ this.handleCloseClientImageModal }
                closeModal={ this.handleCloseClientImageModal}
                currentUser={ currentUser }
                expandedClientID={ expandedClientID }
                handleCreateOrder={ this.handleCreateOrder }
                handleDeleteOrder={ this.handleDeleteOrder }
                handlePdfQuote={ this.handlePdfQuote }
                images={ images }
                onBtcUpdate={ this.updateBitcoinWalletAddress }
                onClientBarExpand={ this.onSwitchClientBar}
                onCreateMessage={ this.handleCreateMessage }
                onDeleteClient={ this.handleDeleteClient }
                onEthUpdate={ this.updateEthereumWalletAddress }
                onMessageDelete={ this.handleDeleteMessage }
                onImageDelete={ this.handleDeleteImage }
                onOrder={ this.handleQueryOrder }
                onOrderId={ this.handleSetOrderId }
                onSend={ this.handleSendMail }
                onUpdate={ this.handleUpdateSettings }
                onUpdateStatusFalse={ this.handleUpdateStatusFalse }
                onUpdateStatusTrue={ this.handleUpdateStatusTrue }
                orderUserId={ orderUserId }
                orders={ orders }
                settings={ masterSettings }
                showClientImageModal={ showClientImageModal }
                showModal={ this.handleOpenClientImageModal }
                tempOrder={ tempOrder }
                uploadPhoto={ this.handleUploadPhoto }
                showWarningDeleteModalClientClientId={ showWarningDeleteModalClientClientId }
                showWarningDeleteModalOrderOrderId={ showWarningDeleteModalOrderOrderId }
                showWarningDeleteModalImageImageId={ showWarningDeleteModalImageImageId }
                openWarningDeleteModalClient={ this.onOpenWarningDeleteModalClient }
                openWarningDeleteModalOrder={ this.onOpenWarningDeleteModalOrder }
                openWarningDeleteModalImage={ this.onOpenWarningDeleteModalImage }
              />
                ) : (
                <p>loading..</p>
              )
            }
            </div>
            <ClientModal
              showAddClientModal={ showAddClientModal }
              closeClientModal={ this.handleClientModal }
              createClient={ this.handleCreateClient }
            />
            </div>
        )
        } />
        </main>
      </Router>
    );
  }

  componentDidMount() {
    this.fetchAllAdminMessages()
    this.fetchAllClientOrders()
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
    this.fetchSignedInAdminDetails()
  }
}

export default App;
// <RegistrationForm onRegistration={ this.handleRegistration } />
