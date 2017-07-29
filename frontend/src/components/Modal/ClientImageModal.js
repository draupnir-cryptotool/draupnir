import React from 'react'
import ReactModal from 'react-modal'

import Image from '../Image'
import { Button } from 'react-bootstrap'
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
        <h2>Client ID</h2>
          <div style={{ margin: '10% 0 0 10%' }}>
            <Image 
              uploadPhoto={ this.props.uploadPhoto }
              clientId={this.props.clientId}
              closeImageModal={ this.props.closeImageModal }
            />
          </div>
        <div>
          <Button type="button" bsStyle="default" onClick={() => this.props.closeImageModal()}> Cancel</Button>
        </div>
        </ReactModal>
      </div>
    )
  }
}

export default ClientImageModal
