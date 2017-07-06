import React from 'react';
import WalletWrapper from './HeaderWrapper/WalletWrapper'

class Header extends React.Component {
  state = {
    error: null,
    bitcoinBalance: null,
    ethereumBalance: null,
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

  render() {
    const { error, bitcoinBalance, ethereumBalance, } = this.state
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
      </main>
    );
  }

  componentDidMount() {
    this.fetchBitcoinPrice()
    this.fetchEthereumPrice()
  }
}

export default Header;
