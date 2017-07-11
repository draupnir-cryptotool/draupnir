import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import './loginForm.css'

function submitSignIn(event, onSignIn) {
  event.preventDefault()
  const form = event.target
  const email = form.elements['email'].value
  const password = form.elements['password'].value
  const OTP = form.elements['OTP'].value
  onSignIn({ email, password, OTP })
}

export default function LogInForm({
  onSignIn
}) {
  const wellStyles = {minWidth: 400};

  const loginStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30%'
  }
  return (
    
    <div style={loginStyle}>
      <div>
        <h1>Caleb and Brown</h1>
        <h3>CONSULTANTS</h3>
      </div>
      <div style={wellStyles}>
        <form onSubmit={ (event) => submitSignIn(event, onSignIn) }>
          <FormGroup controlId="formBasicText">
            <FormControl type="text" name="email" placeholder="Enter email"/>
            <FormControl type="password" name="password" placeholder="Enter password"/>
            <FormControl type="text" name="OTP" placeholder="Enter Auth Code"/>
            <Button bsStyle="default" type="submit" block>Sign In</Button>
          </FormGroup>
        </form>
      </div>
    </div>
  )
}
