import React from 'react'
import Field from './Field'


function submitSendMail(event, onSend) {
  event.preventDefault()
  const form = event.target
  const subject = form.elements.subject.value
  const text = form.elements.text.value
  onSend({ subject, text })
}

export default function Mail({  
  onSend
}) {
  return (
    <div>
      <h1>mail</h1>
      <form onSubmit={ (event) => submitSendMail(event, onSend) }>
        <Field label="subject" name="subject" />
        <Field label="text" name="text" />
        <button>Send</button>
      </form>
    </div>
  )
}
