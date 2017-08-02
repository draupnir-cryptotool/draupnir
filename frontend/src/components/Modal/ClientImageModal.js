import React from 'react'
import ReactModal from 'react-modal'
import { Button, Modal, ButtonToolbar } from 'react-bootstrap'
import UploadImage from '../uploadImage'
import './modalStyles.css'

class ClientImageModal extends React.Component {

  render() {
    return (
      <div>
        <Modal
          show={this.props.showClientImageModal}
        >
        <Modal.Header>
          <Modal.Title><p>Client ID</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: '10% 0 0 10%' }}>
            <UploadImage 
              uploadPhoto={ this.props.uploadPhoto }
              clientId={this.props.clientId}
              closeImageModal={ this.props.closeImageModal }
            />
          </div>
          <div>
            <Button type="button" bsStyle="default" onClick={() => this.props.closeImageModal()}> Cancel</Button>
          </div>
        </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ClientImageModal
