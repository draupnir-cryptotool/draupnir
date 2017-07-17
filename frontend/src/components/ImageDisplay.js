import React from 'react'
import Field from './Field'
import Dropzone from 'react-dropzone'
import ReactDOM from 'react-dom'
import { Button, FormGroup, ControlLabel, FormControl, Form, Col } from 'react-bootstrap'



 class ImageDisplay extends React.Component  {

  submitImage = (image, uploadPhoto) => {
  const idType = ReactDOM.findDOMNode(this.refs.idType).value
    let file = image[0]
    uploadPhoto({ file, idType })
  }

  render() {
    return (
      <div>
        <Form horizontal>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={3}>
              <b style={{ color: "red" }}>*</b>ID Type
            </Col>
            <Col sm={5}>
            <FormControl type="text" placeholder="type" ref="idType" />
            </Col>
          </FormGroup>
        </Form>
        <Dropzone onDrop={ (event) => this.submitImage(event, this.props.uploadPhoto) }>
        <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
      </div>
    )
  }
}

export default ImageDisplay
