import React from 'react'
import ReactDOM from 'react-dom'
import { Button, FormGroup, ControlLabel, FormControl, Form, Col } from 'react-bootstrap'
import "./settings.css"

class Settings extends React.Component {

  submitUpdateRequest = (event, onUpdate) => {
  event.preventDefault()
  const bitfinexFloat = ReactDOM.findDOMNode(this.refs.bitfinexFloat).value
  const btceFloat = ReactDOM.findDOMNode(this.refs.btceFloat).value
  const bitstampFloat = ReactDOM.findDOMNode(this.refs.bitstampFloat).value
  onUpdate({ bitfinexFloat, btceFloat, bitstampFloat })
}

  render() {
  return (
    <div>
      <h1>Floats</h1>
      <Form horizontal onSubmit={ (event) => this.submitUpdateRequest(event, this.props.onUpdate) }>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ ControlLabel } sm={2}>
          Bitfinex Balance
          </Col>
          <Col sm={2}>
            <FormControl type="text" ref="bitfinexFloat" defaultValue={ `${this.props.settings.bitfinexFloat}` }/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ ControlLabel } sm={2}>
          BTC-E Balance
          </Col>
          <Col sm={2}>
            <FormControl type="text" ref="btceFloat" defaultValue={ `${this.props.settings.btceFloat}` } />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ ControlLabel } sm={2}>
          Bitstamp Balance
          </Col>
          <Col sm={2}>
            <FormControl type="text" ref="bitstampFloat" defaultValue={ `${this.props.settings.bitstampFloat}` } />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col>
            <Button className={ "updateBtn" } type="submit">Update</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  )
  }
}

export default Settings