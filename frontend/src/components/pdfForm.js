import React from 'react'

export default function PdfForm({
  quoteValues
}) {
  return (
    <div>
      <h1>Create Quote PDF</h1>
      <form method='post' action='localhost:8000/api/pdfquote'>
        <label>File Name</label>
        <input type='text' name='filename' placeholder='File name' />
        <label>Text</label>
        <input type='textarea' name='content' placeholder='Write some text...' />
        <input type='submit' value='Create PDF' />
      </form>
    </div>
  )
}

