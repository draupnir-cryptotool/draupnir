import React from 'react';
import WalletWrapper from './HeaderWrapper/WalletWrapper'
import UsdLivePriceWrapper from './HeaderWrapper/UsdLivePrices/UsdLivePriceWrapper'


class Header extends React.Component {
  state = {
    error: null,
    bitcoinBalance: null,
    ethereumBalance: null,
    bitfinexBitcoinUsdPrice: null,
    bitfinexEthUsdPrice: null,
    btceBitcoinUsdPrice: null,
    btceEthUsdPrice: null,
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
  fetchBitfinexBitcoinUsdPrice = () => {
    fetch('/api/livecoinprices/bitfinex/btcusd')
    // bring in json data
      .then(res => res.json())
      .then(bitfinexBitcoinUsdPrice => {
        this.setState({ bitfinexBitcoinUsdPrice })
        // fetch data from api every 10 seconds
        setTimeout(this.fetchBitfinexBitcoinUsdPrice, 10000)
      })
      .catch(error => {
        this.setState({ error })
        setTimeout(this.fetchBitfinexBitcoinUsdPrice, 10000)
      })
  }

  // get eth/usd price from bitfinex
  fetchBitfinexEthUsdPrice = () => {
    fetch('/api/livecoinprices/bitfinex/ethusd')
    // bring in json data
      .then(res => res.json())
      .then(bitfinexEthUsdPrice => {
        this.setState({ bitfinexEthUsdPrice })
        // fetch data from api every 10 seconds
        setTimeout(this.fetchBitfinexEthUsdPrice, 10000)
      })
      .catch(error => {
        this.setState({ error })
        setTimeout(this.fetchBitfinexEthUsdPrice, 10000)
      })
  }

  // get bitcoin/usd price from BTC-E
  fetchBtceBitcoinUsdPrice = () => {
    fetch('/api/livecoinprices/btc-e/btcusd')
    // bring in json data
      .then(res => res.json())
      .then(btceBitcoinUsdPrice => {
        this.setState({ btceBitcoinUsdPrice })
        // fetch data from api every 10 seconds
        setTimeout(this.fetchBtceBitcoinUsdPrice, 10000)
      })
      .catch(error => {
        this.setState({ error })
        setTimeout(this.fetchBtceBitcoinUsdPrice, 10000)
      })
  }

  // get eth/usd price from BTC-E
  fetchBtceEthUsdPrice = () => {
    fetch('/api/livecoinprices/btc-e/ethusd')
    // bring in json data
      .then(res => res.json())
      .then(btceEthUsdPrice => {
        this.setState({ btceEthUsdPrice })
        // fetch data from api every 10 seconds
        setTimeout(this.fetchBtceEthUsdPrice, 10000)
      })
      .catch(error => {
        this.setState({ error })
        setTimeout(this.fetchBtceEthUsdPrice, 10000)
      })
  }

  // get bitcoin/usd price from bitstamp
  fetchBitstampBitcoinUsdPrice = () => {
    fetch('/api/livecoinprices/bitstamp/btcusd')
    // bring in json data
      .then(res => res.json())
      .then(bitstampBitcoinPrice => {
        this.setState({ bitstampBitcoinPrice })
        // fetch data from api every 10 seconds
        setTimeout(this.fetchBitstampBitcoinUsdPrice, 10000)
      })
      .catch(error => {
        this.setState({ error })
        setTimeout(this.fetchBitstampBitcoinUsdPrice, 10000)
      })
  }

  render() {
    const { error, bitcoinBalance, ethereumBalance, bitfinexBitcoinUsdPrice,
            bitfinexEthUsdPrice, btceBitcoinUsdPrice, btceEthUsdPrice, bitstampBitcoinPrice
          } = this.state
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
          bitfinexBitcoinUsdPrice && bitfinexEthUsdPrice && btceBitcoinUsdPrice 
          && btceEthUsdPrice && bitstampBitcoinPrice ? (
            <UsdLivePriceWrapper
              bitfinexBtcValue={ bitfinexBitcoinUsdPrice }
              bitfinexEthValue={ bitfinexEthUsdPrice }
              btceBtcValue={ btceBitcoinUsdPrice }
              btceEthValue={ btceEthUsdPrice }
              bitstampBtcValue={ bitstampBitcoinPrice }
            />
          ) :
          (
            <p>loading</p>
          )
        }
      </main>
    );
  }

  componentDidMount() {
    this.fetchBitcoinPrice()
    this.fetchEthereumPrice()
    this.fetchBitfinexBitcoinUsdPrice()
    this.fetchBitfinexEthUsdPrice()
    this.fetchBtceBitcoinUsdPrice()
    this.fetchBtceEthUsdPrice()
    this.fetchBitstampBitcoinUsdPrice()
  }
}

export default Header;
