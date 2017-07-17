import React from 'react'
import ReactModal from 'react-modal'
import ImageDisplay from '../ImageDisplay'
import { Button, FormGroup, ControlLabel, FormControl, Form, Col } from 'react-bootstrap'
import './modalStyles.css'

class ClientImageModal extends React.Component {

  render() {
    return (
      <div>
        <ReactModal 
          isOpen={this.props.showClientImageModal}
          contentLabel="Minimal Modal Example" 
          style={{overlay: {
          width: '50%',
          height: '45%',
          margin: 'auto'
          },
          }}
        >
          <Form horizontal>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} sm={2}>
                Type
              </Col>
              <Col sm={5}>
              <FormControl type="text" placeholder="type" ref="type" />
              </Col>
            </FormGroup>
          </Form>
          <div style={{ marginLeft: '17.5%' }}>
            <ImageDisplay />
            <Button className="submitBtn" type="submit" bsStyle="primary">Upload</Button>
          </div>

        </ReactModal>
      </div>
    )
  }
}

export default ClientImageModal
