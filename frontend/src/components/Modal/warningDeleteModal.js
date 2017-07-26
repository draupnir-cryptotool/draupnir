import React from 'react'
import { Button, Modal, ButtonToolbar } from 'react-bootstrap'

export default function WarningDeleteModal({
model, 
executeFunction, 
modelParameter, 
showWarningDeleteModal,
warningDeleteModal,
onDeleteClient,
id
}) {
    const handleDeleteClient = (onDeleteClient) => {
    const clientId = id
    console.log(clientId)
    onDeleteClient({clientId})
    warningDeleteModal("showWarningDeleteModal")
  }

  const modelTitle = {
    client: `Are you sure you want to delete this ${model}?`,
    order: `Are you sure you want to delete this ${model}`,
    messages: `Are you sure you want to delete this ${model}`
  }

    const handleExecution = () => (
      executeFunction(modelParameter)
    )


  return (
    <div className="static-modal">
      <Modal show={ showWarningDeleteModal }>
        <Modal.Header closeButton>
          <Modal.Title><p>{modelTitle[model]}</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <ButtonToolbar>
            <Button 
              bsStyle="primary" 
              bsSize="small"
              type="submit"
              onClick={ () => ( handleDeleteClient(onDeleteClient)) }>
              {
                "delete" + " " + model
              }
            </Button>  
            <Button 
              bsStyle="default"
              bsSize="small" 
              type="submit"
              onClick={ () => (warningDeleteModal("showWarningDeleteModal"))}
              >
              Cancel
            </Button>
          </ButtonToolbar> 
        </Modal.Body>
      </Modal>
    </div>
  )
}
