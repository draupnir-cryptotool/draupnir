import React from 'react'
import ReactDOM from 'react-dom'
import { Button, FormGroup, ControlLabel, FormControl, Form, Col } from 'react-bootstrap'
import "./settings.css"

class SettingsForm extends React.Component {

  submitUpdateRequest = (event, onUpdate, onEthUpdate, onBtcUpdate) => {
    event.preventDefault()
    const bitfinexFloat = ReactDOM.findDOMNode(this.refs.bitfinexFloat).value || 0
    const btceFloat = ReactDOM.findDOMNode(this.refs.btceFloat).value || 0
    const bitstampFloat = ReactDOM.findDOMNode(this.refs.bitstampFloat).value || 0
    const ethWalletAddress = ReactDOM.findDOMNode(this.refs.ethWalletAddress).value
    const btceWalletAddress = ReactDOM.findDOMNode(this.refs.btceWalletAddress).value
    onUpdate({ bitfinexFloat, btceFloat, bitstampFloat, ethWalletAddress, btceWalletAddress })
  }

  render() {
    const dollarSymbolStyle = {
    position: 'relative',
    left: '26%'
    }
  const labelStyle = {
    color: 'white'
  }
  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{ marginRight: '3em' }}>
          <h1 style={{ marginLeft: '6%', color: 'white', marginBottom: '15%' }}>Floats</h1>
          <Form horizontal>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ ControlLabel } sm={5}>
              <p style={labelStyle}>Bitfinex</p><span style={ dollarSymbolStyle }>$</span>
              </Col>
              <Col sm={5}>
                <FormControl type="text" ref="bitfinexFloat" defaultValue={ `${this.props.settings.bitfinexFloat}` }/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ ControlLabel } sm={5}>
              <p style={labelStyle}>BTC-E</p><span style={ dollarSymbolStyle }>$</span>
              </Col>
              <Col sm={5}>
                <FormControl type="text" ref="btceFloat" defaultValue={ `${this.props.settings.btceFloat}` } />
              </Col>
            </FormGroup>
            <FormGroup className="lastForm" controlId="formHorizontalName">
              <Col componentClass={ ControlLabel } sm={5}>
              <p style={labelStyle}>Bitstamp</p><span style={ dollarSymbolStyle }>$</span>
              </Col>
              <Col sm={5}>
                <FormControl type="text" ref="bitstampFloat" defaultValue={ `${this.props.settings.bitstampFloat}` } />
              </Col>
            </FormGroup>
          </Form>
          <Button 
            className={ "floatUpdateBtn" } 
            bsSize="small"
            bsStyle="primary" type="submit" 
            onClick={(event) => this.submitUpdateRequest(event, this.props.onUpdate)}>Update
          </Button>
        </div>
        <div className="settingsDivider"></div>
        <div>
          <h1 style={{color: 'white', marginBottom: '15%'}}>Crypto Wallet</h1>
          <Form horizontal>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ ControlLabel } sm={4}>
              <p style={labelStyle}>BTC</p>
              </Col>
              <Col sm={8}>
                <FormControl type="text" ref="btceWalletAddress" defaultValue={ `${this.props.settings.btceWalletAddress}` }/>
              </Col>
            </FormGroup>
            <Button 
              className={ "walletUpdateBtn" } 
              bsSize="small"
              bsStyle="primary" type="submit" 
              onClick={(event) => this.submitUpdateRequest(event, this.props.onBtcUpdate)}>Update
            </Button>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ ControlLabel } sm={4}>
              <p style={labelStyle}>ETH</p>
              </Col>
              <Col sm={8}>
                <FormControl type="text" ref="ethWalletAddress" defaultValue={ `${this.props.settings.ethWalletAddress}` }/>
              </Col>
            </FormGroup>
          </Form>
          <Button 
            className={ "walletUpdateBtn" } 
            bsSize="small"
            bsStyle="primary" type="submit" 
            onClick={(event) => this.submitUpdateRequest(event, this.props.onEthUpdate)}>Update
          </Button>
        </div>
      </div>
    </div>
  )
  }
}

export default SettingsForm


