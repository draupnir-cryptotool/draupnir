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

  const dividerStyle = {
    border: 'solid',
    height: '30rem',
    position: 'relative',
    bottom: '7rem',
    color: 'white'
  }

  const loginStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30%'
  }
  return (
    
    <div style={loginStyle}>
      <div>
        <h1 style={{fontSize: '4em', color: 'white'}}>Caleb and Brown</h1>
        <h3 style={{textAlign: 'center', letterSpacing: '4px', color: 'white'}}>CONSULTANTS</h3>
      </div>
      <div style={dividerStyle}></div>
      <div style={wellStyles}>
        <form onSubmit={ (event) => submitSignIn(event, onSignIn) }>
          <FormGroup controlId="formBasicText">
            <FormControl className="formInput" type="text" name="email" placeholder="email"/>
            <FormControl className="formInput" type="password" name="password" placeholder="password"/>
            <FormControl className="formInput" type="text" name="OTP" placeholder="Auth Code"/>
            <Button className="submitBtn" bsStyle="default" type="submit" block>Sign In</Button>
          </FormGroup>
        </form>
      </div>
    </div>
  )
}
