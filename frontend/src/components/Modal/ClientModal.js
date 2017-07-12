import React from 'react'
import ReactModal from 'react-modal'

export default function ClientModal({
  showModal
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
    </ReactModal>
  </div>
  )}