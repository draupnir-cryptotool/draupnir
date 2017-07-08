import React from 'react'
import Field from './Field'

function submitRegistration(event, onRegistration) {
  event.preventDefault()
  const form = event.target
  const email = form.elements['email'].value
  const firstname = form.elements['firstname'].value
  const lastname = form.elements['lastname'].value
  const password = form.elements['password'].value
  onRegistration({ email, firstname, lastname, password, })
}

export default function RegistrationForm({
  onRegistration
}) {
  return (
    <form onSubmit={ (event) => submitRegistration(event, onRegistration) }>
      <Field label="Email" name="email" />
      <Field label="First Name" name="firstname" />
      <Field label="Last Name" name="lastname" />
      <Field label="Password" name="password" type="password" />
      <button>Register</button>
    </form>
  )
}