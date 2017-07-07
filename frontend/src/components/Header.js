import React from 'react';
import WalletWrapper from './HeaderWrapper/WalletWrapper'
// import LivePriceWrapper from './HeaderWrapper/LivePricesWrapper'
import UsdLivePriceWrapper from './HeaderWrapper/UsdLivePricesWrapper/UsdLivePriceWrapper'

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
    fetch('/api/bitcoinbalance')
    // bring in json data
      .then(res => res.json())
      .then(bitcoinBalance => {
        this.setState({ bitcoinBalance })
      })
      .catch(error => {
        this.setState({ error })
      })
  }   

  // Get Ethereum balance from wallet api
  fetchEthereumPrice = () => {
    fetch('/api/ethereumbalance')
    // bring in json data
      .then(res => res.json())
      .then(ethereumBalance => {
        this.setState({ ethereumBalance })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  // get bitcoin/usd price from bitfinex
  fetchBitfinexBitcoinPrice = () => {
    fetch('/api/livecoinprices/bitfinex/btc')
    // bring in json data
      .then(res => res.json())
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
    fetch('/api/livecoinprices/bitfinex/eth')
    // bring in json data
      .then(res => res.json())
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
    fetch('/api/livecoinprices/btc-e/btc')
    // bring in json data
      .then(res => res.json())
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
    fetch('/api/livecoinprices/btc-e/eth')
    // bring in json data
      .then(res => res.json())
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
    fetch('/api/livecoinprices/bitstamp/btc')
    // bring in json data
      .then(res => res.json())
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
        {
          bitfinexBitcoinPrice && bitfinexEthPrice && btceBitcoinPrice 
          && btceEthPrice && bitstampBitcoinPrice ? (
            <div>
              <UsdLivePriceWrapper
                currentCurrency={ currentCurrency }
                bitfinexBtcValue={ bitfinexBitcoinPrice }
                bitfinexEthValue={ bitfinexEthPrice }
                btceBtcValue={ btceBitcoinPrice }
                btceEthValue={ btceEthPrice }
                bitstampBtcValue={ bitstampBitcoinPrice }
              />
            </div>  
          ) :
          (
            <p>loading..</p>
          )
        }
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


