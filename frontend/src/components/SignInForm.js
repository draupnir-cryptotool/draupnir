import React from 'react'
import Field from './Field'

function submitSignIn(event, onSignIn) {
  event.preventDefault()
  const form = event.target
  const email = form.elements['email'].value
  const password = form.elements['password'].value
  const OTP = form.elements['OTP'].value
  onSignIn({ email, password, OTP })
}

export default function SignInForm({
  onSignIn
}) {
  return (
    <form onSubmit={ (event) => submitSignIn(event, onSignIn) }>
      <Field label="Email" name="email" />
      <Field label="Password" name="password" type="password" />
      <Field label="Google Authenticator Code" name="OTP" />
      <button>Sign In</button>
    </form>
  )
}
