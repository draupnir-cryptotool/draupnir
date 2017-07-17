import React from 'react'
import ReactModal from 'react-modal'
import ImageDisplay from '../ImageDisplay'
import Image from '../Image'
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
          height: '50%',
          margin: 'auto'
          },
          }}
        >
          <div style={{ marginLeft: '26.5%' }}>
            <Image uploadPhoto={ this.props.uploadPhoto } />
          </div>
        <div>
          <Button type="button" bsStyle="default" onClick={() => this.props.closeModal()}> Cancel</Button>
        </div>
        </ReactModal>
      </div>
    )
  }
}


export default ClientImageModal
