import React from 'react'
import ReactModal from 'react-modal'
import { Button } from 'react-bootstrap'

export default function ClientModal({
  showModal, closeModal
}) {
  return (
  <div>
    <ReactModal 
      isOpen={showModal}
      contentLabel="Minimal Modal Example"
      style={{overlay: {
        width: '50%',
        margin: 'auto'
      },
      }}
    >
    <h1>ITS A MODAL!!</h1>
    <Button onClick={() => closeModal()} bsStyle="default">Close me</Button>
    </ReactModal>
  </div>
  )}