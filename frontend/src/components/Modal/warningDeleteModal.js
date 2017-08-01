import React from 'react'
import { Button, Modal, ButtonToolbar } from 'react-bootstrap'

export default function WarningDeleteModal({
model, 
showWarningDeleteModal, //will be either true or false
warningDeleteModal, //
deleteFunction,
id
}) {
    const handleDelete = () => {
    deleteFunction({ id })
    console.log(id)
    warningDeleteModal
  }

  const modelTitle = {
    client: `Are you sure you want to delete this ${model}?`,
    order: `Are you sure you want to delete this ${model}`,
    messages: `Are you sure you want to delete this ${model}`
  }

  return (
    <div className="static-modal">
      <Modal show={ showWarningDeleteModal }>
        <Modal.Header>
          <Modal.Title><p>{modelTitle[model]}</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <ButtonToolbar>
            <Button 
              bsStyle="primary" 
              bsSize="small"
              type="submit"
              onClick={ () => ( handleDelete()) }>
              {
                "delete" + " " + model
              }
            </Button>  
            <Button 
              bsStyle="default"
              bsSize="small" 
              type="submit"
              onClick={ () => (warningDeleteModal())}
              >
              Cancel
            </Button>
          </ButtonToolbar> 
        </Modal.Body>
      </Modal>
    </div>
  )
}
