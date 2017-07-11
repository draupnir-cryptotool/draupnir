import React from 'react'

class Order extends React.Component {
  render() {
    return (
      <div>
        <h1>Order Form</h1>
        <h3>Exchange Floats</h3>
        <form id="floatsForm">
          <label for="btce">Bitfinex</label>
          <input type="text" ref="bitfinexLimit" placeholder="0" />
          <label for="btce">Bitstamp</label>
          <input type="text" ref="bitstampLimit" placeholder="0" />
          <label for="btce">BTC-e:</label>
          <input type="text" ref="btceLimit" placeholder="0" />
        </form>
        <h3>Order Amount (USD)</h3>
        <form id="orderAmount" onSubmit={this.handleSubmit}>
          <label for="amount">Amount:</label>
          <input type="text"  ref="amount" placeholder="Order amount" />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
  
   function handleSubmit(e) {
    e.preventDefault();
    var bitfinexLimit = this.refs.bitfinexLimit.value;
    var bitstampLimit = this.refs.bitstampLimit.value;
    var btceLimit = this.refs.btceLimit.value;
    var amount = this.refs.amount.value;
  }
}

export default Order
