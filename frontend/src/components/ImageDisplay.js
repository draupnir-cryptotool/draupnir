import React from 'react'
import Field from './Field'
import Dropzone from 'react-dropzone'


function submitImage(image, onDisplay) {
    let file = image[0]
    console.log(file);
    onDisplay({ file })
  }

export default function ImageDisplay({
  onDisplay
}) {
  return (
    <div>
      <Dropzone onDrop={ (event) => submitImage(event, onDisplay) }>
      <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
    </div>
  )
}