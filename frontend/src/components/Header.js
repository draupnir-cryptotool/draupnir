import React from 'react';
import WalletWrapper from './HeaderWrapper/WalletWrapper/WalletWrapper'
// import LivePriceWrapper from './HeaderWrapper/LivePricesWrapper/LivePriceWrapper'
import LivePriceWrapper from '../components/HeaderWrapper/LivePricesWrapper/LivePriceWrapper'
import * as walletApi from '../api/wallet'
import * as livePriceApi from '../api/livePrice'

class Header extends React.Component {
  state = {
    error: null,
    currentCurrency: 'usd',
    bitcoinBalance: null,
    ethereumBalance: null,
    bitfinexBitcoinPrice: null,
    bitfinexEthPrice: null,
    btceBitcoinPrice: null,
    btceEthPrice: null,
    bitstampBitcoinPrice: null,
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
    const { error, currentCurrency, bitcoinBalance, ethereumBalance, bitfinexBitcoinPrice,
            bitfinexEthPrice, btceBitcoinPrice, btceEthPrice, bitstampBitcoinPrice
          } = this.state

          const divStyle = {
            display: 'flex'
          }
    return (
      <main>
        <div style={ divStyle }>
          <div>
            { !!error && <p>{ error.message }</p> }
            {
              !!bitcoinBalance && !!ethereumBalance ?
              (
                <WalletWrapper
                  bitBalance={ bitcoinBalance }
                  onBtcUpdate={ this.fetchBitcoinPrice }
                  etherBalance={ ethereumBalance }
                  onEthUpdate={ this.fetchEthereumPrice }
                />
              ) : (
                <p>loading...</p>
              )
            }
          </div>
          {
            bitfinexBitcoinPrice && bitfinexEthPrice && btceBitcoinPrice 
            && btceEthPrice && bitstampBitcoinPrice ? (
              <div>
                <LivePriceWrapper
                  bitfinexBtcValue={ currentCurrency === 'usd' ? bitfinexBitcoinPrice.usdPrice : bitfinexBitcoinPrice.audPrice }
                  bitfinexEthValue={ currentCurrency === 'usd' ? bitfinexEthPrice.usdPrice : bitfinexEthPrice.audPrice }
                  btceBtcValue={ currentCurrency === 'usd' ? btceBitcoinPrice.usdPrice : btceBitcoinPrice.audPrice }
                  btceEthValue={ currentCurrency === 'usd' ? btceEthPrice.usdPrice : btceEthPrice.audPrice }
                  bitstampBtcValue={ currentCurrency === 'usd' ? bitstampBitcoinPrice.usdPrice : bitstampBitcoinPrice.audPrice }
                  onCurrencyChangeUsd={ this.onSwitchUSDCurrency }
                  onCurrencyChangeAud={ this.onSwitchAUDCurrency }
                />
              </div>  
            ) :
            (
              <p>loading..</p>
            )
          }
        </div>
      </main>
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
  }
}

export default Header;


