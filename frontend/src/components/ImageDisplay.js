import React from 'react'
import Field from './Field'
import Dropzone from 'react-dropzone'
import ReactDOM from 'react-dom'
import { Button, FormGroup, ControlLabel, FormControl, Form, Col } from 'react-bootstrap'

class ImageDisplay extends React.Component  {
// clientId sent in from parent
  submitImage = (image, uploadPhoto) => {
  const idType = ReactDOM.findDOMNode(this.refs[this.props.clientId]).value
  const clientId = this.props.clientId
    let file = image[0]
    console.log(image)
    uploadPhoto({ file, idType, clientId })
    this.props.closeImageModal()
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
            <FormControl type="text" placeholder="type" ref={`${this.props.clientId}`}/>
            </Col>
          </FormGroup>
        </Form>
        <div style={{ marginLeft: "26.5%" }}>
          <Dropzone onDrop={ (event) => this.submitImage(event, this.props.uploadPhoto) }>
          <p>Drop files here! or click to select files to upload.</p>
          </Dropzone>
        </div>
      </div>
    )
  }
}
export default ImageDisplay
