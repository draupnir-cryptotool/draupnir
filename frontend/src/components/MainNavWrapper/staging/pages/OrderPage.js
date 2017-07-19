import React from 'react'
import ReactDOM from 'react-dom'
import { Button, FormGroup, ControlLabel, FormControl, Form, Col,
          Table      } from 'react-bootstrap'
import _ from 'lodash'
import * as orderAPI from '../../../../api/order'

class OrderPage extends React.Component{

  submitOrder = (event, onOrder, onOrderId) => {
    event.preventDefault()
    const amount = ReactDOM.findDOMNode(this.refs.deposit).value
    const buying = ReactDOM.findDOMNode(this.refs.currency).value
    const tally = ReactDOM.findDOMNode(this.refs.tally).value
    const bitfinexLimit = ReactDOM.findDOMNode(this.refs.bitfinexFloat).value
    const btceLimit = ReactDOM.findDOMNode(this.refs.btceFloat).value
    const bitstampLimit = ReactDOM.findDOMNode(this.refs.bitstampFloat).value
    onOrder({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit })
    const reqId = this.props.client._id
    onOrderId({ reqId })
  }

  render() {
    const dollarSymbolStyle = {
    position: 'relative',
    left: '26%'
    }
    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: '50%'}}>
          <div style={{ marginRight: '3em' }}>
            <h1 style={{ textAlign: 'center' }}>FLOATS</h1>
            <Form horizontal>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                Buying
                </Col>
                <Col sm={5}>
                  <FormControl type="text" ref="deposit"/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Coin
                </Col>
                <Col sm={5}>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    ref="currency"
                  >
                    <option value="btc">Bitcoin</option>
                    <option value="eth">Ethereum</option>
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Tally
                </Col>
                <Col sm={5}>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    ref="tally"
                  >
                    <option value="usd">USD</option>
                    <option value="btc">BTC</option>
                  </FormControl>
                </Col>
              </FormGroup>

              <FormControl type="hidden" ref="bitfinexFloat" defaultValue={ 
              `${this.props.settings.bitfinexFloat}` }/>

              <FormControl type="hidden" ref="btceFloat" defaultValue={ 
              `${this.props.settings.btceFloat}` }/>

              <FormControl type="hidden" ref="bitstampFloat" defaultValue={ 
              `${this.props.settings.bitstampFloat}` }/>

            </Form>
            <Button 
              className={ "updateBtn" } 
              bsSize="large"
              bsStyle="primary" type="submit" 
              onClick={(event) => this.submitOrder(event, this.props.onOrder, this.props.onOrderId)}>
              Query Order
            </Button>
          </div>
        </div>

        <div style={{flexDirection: 'row', width: '50%'}}>
        { !_.isEmpty(this.props.tempOrder) && this.props.client._id === this.props.orderUserId ? (
          <div>
            <h1 style={{ textAlign: 'center' }}>ORDER</h1>
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Volume</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><h4>BITFINEX</h4></td>
                  <td>{ parseFloat(this.props.tempOrder.exchanges.bitfinex.coinBought).toFixed(2) }</td>
                  <td>{ parseFloat(this.props.tempOrder.exchanges.bitfinex.usdSpent).toFixed(2) }</td>
                </tr>
                <tr>
                  <td><h4>BTC-E</h4></td>
                  <td>{ parseFloat(this.props.tempOrder.exchanges.btce.coinBought).toFixed(2) }</td>
                  <td>{ parseFloat(this.props.tempOrder.exchanges.btce.usdSpent).toFixed(2) }</td>
                  <td></td>
                </tr>
                <tr>
                  <td><h4>BITSTAMP</h4></td>
                  <td>{ parseFloat(this.props.tempOrder.exchanges.bitstamp.coinBought).toFixed(2) }</td>
                  <td>{ parseFloat(this.props.tempOrder.exchanges.bitstamp.usdSpent).toFixed(2) }</td>
                  <td></td>
                </tr>
                <tr>
                  <td><h4><strong>TOTAL</strong></h4></td>
                  <td><strong>
                    { parseFloat(this.props.tempOrder.totalCoinBought).toFixed(2) }
                  </strong></td>
                  <td><strong>
                    { parseFloat(this.props.tempOrder.totalUsdSpent).toFixed(2) }
                  </strong></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div> ) : ( ' ' )
        }
        </div>
      </div>
    )
  }
}

export default OrderPage