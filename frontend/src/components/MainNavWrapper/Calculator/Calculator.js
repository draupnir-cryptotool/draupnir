import React from 'react'
import ReactDOM from 'react-dom'
import { Button, FormGroup, ControlLabel, FormControl, Form, Col,
          Table      } from 'react-bootstrap'
import _ from 'lodash'
import * as orderAPI from '../../../api/order'
import HyperLink from './HyperLink'
import './pages.css'

class Calculator extends React.Component{

  submitOrder = (event, onOrder, onOrderId) => {
    event.preventDefault()
    const amount = ReactDOM.findDOMNode(this.refs.deposit).value
    const buying = ReactDOM.findDOMNode(this.refs.currency).value
    const tally = ReactDOM.findDOMNode(this.refs.tally).value
    const bitfinexLimit = ReactDOM.findDOMNode(this.refs.bitfinexFloat).value
    const btceLimit = ReactDOM.findDOMNode(this.refs.btceFloat).value
    const bitstampLimit = ReactDOM.findDOMNode(this.refs.bitstampFloat).value
    onOrder({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit })
  }

  render() {
    const dollarSymbolStyle = {
    position: 'relative',
    left: '26%'
    }
    return (
      <div className="orderPage" style={{display: 'flex', marginTop: "25px"}}>
        <div className="orderForm" style={{display: 'flex', flexDirection: 'row', width: '50%' }}>
          <div style={{ margin: '0 3em 0 3em' }}>
            <h1 style={{ textAlign: 'center' }}>FLOATS</h1>
            <Form horizontal>

              <FormGroup style={{ margin: "25px 0 25px 0" }} controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                Buying
                </Col>
                <Col sm={5}>
                  <FormControl type="text" ref="deposit"/>
                </Col>
              </FormGroup>

              <FormGroup style={{ margin: "30px 0 25px 0" }} controlId="formHorizontalName">
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

              <FormGroup style={{ margin: "30px 0 25px 0" }} controlId="formHorizontalName">
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

              <Button
                style={{ marginLeft: "40.6%" }}
                className={ "updateBtn" } 
                bsSize="medium"
                bsStyle="primary" type="submit" 
                onClick={(event) => this.submitOrder(event, this.props.onOrder, this.props.onOrderId)}>
                Query Order
              </Button>

            </Form>
          </div>
        </div>

        <div style={{flexDirection: 'row', width: '50%'}}>
        { !_.isEmpty(this.props.tempOrder) && this.props.client._id === this.props.orderUserId ? (
          <div>
            <h1 style={{ textAlign: 'center', color: "#FFFFFF" }}>ORDER</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '0', gridAutoRows: 'minmax(50px, auto)'}}>
              <div className="orderGrid"><p style={{color: 'white', fontSize: '1.5em' }}>Exchange</p></div>
              <div className="orderGrid"><p style={{color: 'white', fontSize: '1.5em' }}>Volume</p></div>
              <div className="orderGrid"><p style={{color: 'white', fontSize: '1.5em' }}>Total</p></div>

              <div className="orderGrid"><p style={{color: 'white', textAlign: 'center', marginRight: '10px', fontSize: '1.5em'}}><HyperLink exchangeName='bitfinex' /></p></div>
              <div className="orderGrid">{ parseFloat(this.props.tempOrder.exchanges.bitfinex.coinBought).toFixed(2) }</div>
              <div className="orderGrid">{ parseFloat(this.props.tempOrder.exchanges.bitfinex.usdSpent).toFixed(2) }</div>

              <div className="orderGrid"><p style={{color: 'white', textAlign: 'center', marginRight: '10px', fontSize: '1.5em'}}><HyperLink exchangeName='btce' /></p></div>
              <div className="orderGrid">{ parseFloat(this.props.tempOrder.exchanges.btce.coinBought).toFixed(2) }</div>
              <div className="orderGrid">{ parseFloat(this.props.tempOrder.exchanges.btce.usdSpent).toFixed(2) }</div>

              <div className="orderGrid"><p style={{color: 'white', textAlign: 'center', marginRight: '10px', fontSize: '1.5em'}}><HyperLink exchangeName='bitstamp' /></p></div>
              <div className="orderGrid">{ parseFloat(this.props.tempOrder.exchanges.bitstamp.coinBought).toFixed(2) }</div>
              <div className="orderGrid">{ parseFloat(this.props.tempOrder.exchanges.bitstamp.usdSpent).toFixed(2) }</div>

              <div className="orderGrid"><p style={{color: 'white', textAlign: 'center', marginRight: '10px', fontSize: '1.5em'}}><strong>TOTAL</strong></p></div>
              <div className="orderGridTotal">{ parseFloat(this.props.tempOrder.totalCoinBought).toFixed(2) }</div>
              <div className="orderGridTotal">{ parseFloat(this.props.tempOrder.totalUsdSpent).toFixed(2) }</div>
              
            </div>
          </div> ) : ( ' ' )
        }
        </div>
      </div>
    )
  }
}

export default Calculator
