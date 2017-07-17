import React from 'react'
import ReactDOM from 'react-dom'
import { Button, FormGroup, ControlLabel, FormControl, Form, Col } from 'react-bootstrap'
import _ from 'lodash'

class OrderPage extends React.Component{

  submitOrder = (event, onRequest) => {
    event.preventDefault()
    const buying = ReactDOM.findDOMNode(this.refs.currency).value
    const tally = ReactDOM.findDOMNode(this.refs.tally).value
    const amount = ReactDOM.findDOMNode(this.refs.deposit).value
    const bitfinexLimit = ReactDOM.findDOMNode(this.refs.bitfinexFloat).value
    const btceLimit = ReactDOM.findDOMNode(this.refs.btceFloat).value
    const bitstampLimit = ReactDOM.findDOMNode(this.refs.bitstampFloat).value
    onRequest({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit })
  }

  render() {
    const dollarSymbolStyle = {
    position: 'relative',
    left: '26%'
    }
    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{ marginRight: '3em' }}>
            <h1 style={{ marginLeft: '6%' }}>Floats</h1>
            <Form horizontal>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                Deposit<span style={ dollarSymbolStyle }>$</span>
                </Col>
                <Col sm={5}>
                  <FormControl type="text" ref="deposit"/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                Buying
                </Col>
                <Col sm={5}>
                  <FormControl type="text" ref="currency"/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                Currency
                </Col>
                <Col sm={5}>
                  <FormControl type="text" ref="tally"/>
                </Col>
              </FormGroup>

              <FormControl type="hidden" ref="bitfinexFloat" defaultValue={ `${this.props.settings.bitfinexFloat}` }/>

              <FormControl type="hidden" ref="btceFloat" defaultValue={ 
              `${this.props.settings.btceFloat}` }/>

              <FormControl type="hidden" ref="bitstampFloat" defaultValue={ 
              `${this.props.settings.bitstampFloat}` }/>

            </Form>
            <Button 
              className={ "updateBtn" } 
              bsSize="large"
              bsStyle="primary" type="submit" 
              onClick={(event) => this.submitOrder(event, this.props.onRequest)}>
              Query Order
            </Button>
          </div>
        </div>

        <div style={{flexDirection: 'row'}}>
          <h3>Best Order</h3>
          {
          !_.isEmpty(this.props.tempOrder) ? ( 
          <ul>
            <li>
              <p>Bitfinex: $
                {this.props.tempOrder.exchanges.bitfinex.usdSpent}
        
                {'  '}
                coins: 
                {this.props.tempOrder.exchanges.bitfinex.coinBought}

              </p>
              </li>
              <li>
                <p>Bitstamp: $
                  {this.props.tempOrder.exchanges.bitstamp.usdSpent}

                  {'  '}
                  coins: 
                  {this.props.tempOrder.exchanges.bitstamp.coinBought}
                </p>
              </li>
              <li>
                <p>BTC-e: $ 
                  {this.props.tempOrder.exchanges.btce.usdSpent}

                  {'  '}
                  coins: 
                  {this.props.tempOrder.exchanges.btce.coinBought}
                </p>
              </li>
              <li>
                <p>Total Gained:&nbsp;   
                  { this.props.tempOrder.totalUsdSpent }

                  {'  '}
                  coins: 
                  { this.props.tempOrder.totalCoinBought }
                </p>
              </li>
            </ul>
            ) : ''
          }
        </div>
      </div>
    )
  }
}

export default OrderPage
// function submitOrder(event, onRequest) {
//   event.preventDefault()
//   const form = event.target
//   const buying = form.elements['currency'].value
//   const tally = form.elements['tally'].value
//   const amount = parseInt(form.elements['deposit'].value)
//   const bitfinexLimit = form.elements['bitfinexFloat'].value
//   const btceLimit = form.elements['btceFloat'].value
//   const bitstampLimit = form.elements['bitstampFloat'].value
//   onRequest({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit })
// }

// export default function OrderPage({ 
//   settings, orders, onRequest, tempOrder
// }) {
//   return (
//     <div>
    
//       <div>
//         <form onSubmit={ (event) => submitOrder(event, onRequest) }>
//           <Field
//             label="Deposit"
//             name="deposit"
//             type="text"
//           />
//           <Field
//             label="Currency"
//             name="currency"
//             type="text"
//           />
//           <Field
//             label="Tally"
//             name="tally"
//             type="text"
//           />    
//           <Field
//             label=""
//             name="bitfinexFloat"
//             type="hidden"
//             defaultValue={ settings.bitfinexFloat }
//           />
//           <Field
//             label=""
//             name="btceFloat"
//             type="hidden"
//             defaultValue={ settings.btceFloat }
//           />
//           <Field
//             label=""
//             name="bitstampFloat"
//             type="hidden"
//             defaultValue={ settings.bitstampFloat }
//           />
//           <button>Submit</button>
//         </form>

//         <h3>Best Order</h3>

//         {
//         !_.isEmpty(tempOrder) ? ( 
//         <ul>
//           <li>
//             <p>Bitfinex: $
//               {tempOrder.exchanges.bitfinex.usdSpent}
      
//               {'  '}
//               coins: 
//               {tempOrder.exchanges.bitfinex.coinBought}

//             </p>
//           </li>
//           <li>
//             <p>Bitstamp: $
//               {tempOrder.exchanges.bitstamp.usdSpent}

//               {'  '}
//               coins: 
//               {tempOrder.exchanges.bitstamp.coinBought}
//             </p>
//           </li>
//           <li>
//             <p>BTC-e: $ 
//               {tempOrder.exchanges.btce.usdSpent}

//               {'  '}
//               coins: 
//               {tempOrder.exchanges.btce.coinBought}
//             </p>
//           </li>
//           <li>
//             <p>Total Gained:&nbsp;   
//               { tempOrder.totalUsdSpent }

//               {'  '}
//               coins: 
//               { tempOrder.totalCoinBought }
//             </p>
//           </li>
//         </ul>
//         ) : (
//           <p>loading..</p>
//         )
//         }
//       </div>
//     </div>
//   )
// }