import React from 'react'

class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      bitfinexLimit: 10000,
      bitstampLimit: 10000,
      btceLimit: 10000,
      amount: 10000,
      order: {
        bitfinex: 0,
        bitstamp: 0,
        btce: 0,
        currencyTotal: 0,
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      bitfinexLimit: this.refs.bitfinexLimit.value,
      bitstampLimit: this.refs.bitstampLimit.value,
      btceLimit: this.refs.btceLimit.value,
      amount: this.refs.amount.value,
    })

    // http://localhost:8000/api/order?buying=btc&tally=usd&amount=20000&btceLimit=5000&bitstampLimit=5000&bitfinexLimit=5000
    let qs = "http://localhost:8000/api/order?buying=btc&tally=usd&amount="
              + this.state.amount
              + "&bitfinexLimit=" + this.state.bitfinexLimit
              + "&bitstampLimit=" + this.state.bitstampLimit
              + "&btceLimit=" + this.state.btceLimit;
    fetch(qs)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          order: {
            bitfinex: json.bitfinex || 0,
            bitstamp: json.bitstamp || 0,
            btce: json.btce || 0,
            currencyTotal: json.currencyTotal,
          }
        });
      })
  }

  render() {
    return (
      <div>
        <h1>Order Form</h1>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <h3>Exchange Floats (USD)</h3>
          <label>Bitfinex</label>
          <input type="text" ref="bitfinexLimit" defaultValue={this.state.bitfinexLimit} />
          <br />
          <label>Bitstamp</label>
          <input type="text" ref="bitstampLimit" defaultValue={this.state.bitstampLimit} />
          <br />
          <label>BTC-e:</label>
          <input type="text" ref="btceLimit" defaultValue={this.state.btceLimit} />
          <h3>Order Amount (USD)</h3>
          <label>Amount:</label>
          <input type="text"  ref="amount" defaultValue={this.state.amount} />
          <button type="submit">Submit</button>
        </form>
        <h3>Best Order</h3>
        <ul>
          <li>
            <p>Bitfinex: $
              {this.state.order.bitfinex}
            </p>
          </li>
          <li>
            <p>Bitstamp: $
              {this.state.order.bitstamp}
            </p>
          </li>
          <li>
            <p>BTC-e: $ 
              {this.state.order.btce}
            </p>
          </li>
          <li>
            <p>Total Coins Gained:&nbsp;   
              {this.state.order.currencyTotal}
            </p>
          </li>
        </ul>
      </div>
    )
  }
}

export default Order

