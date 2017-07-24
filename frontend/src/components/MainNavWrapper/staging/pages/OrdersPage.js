import React from 'react';
import ReactDOM from 'react-dom';
import { 
  Button,
  ButtonToolbar,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Modal,
  Table,
} from 'react-bootstrap';
import * as clientOrdersAPI from '../../../../api/clientOrders.js';
import _ from 'lodash';
import Order from './order';

export default function OrdersPage({
  client,
  clientOrders,
  handleCreateOrder,
  handleDeleteOrder,
}) {

const createOrder = (event, handleCreateOrder) => {
    event.preventDefault();
    const clientId = client._id;
    const amount = document.getElementById('amount').value
    const coin = document.getElementById('coin').value

    handleCreateOrder({ clientId, amount, coin });
  }
  
  return (
    <div style={{margin: '1rem'}}>
      <div>
        { // Check if this client has any orders, then display them
          (clientOrders)
            ? clientOrders.map((order) => (
                (order.clientId === client._id)
                ?  <Order
                     order={ order }
                     handleDeleteOrder={ handleDeleteOrder }
                     key={ order._id }
                   />
                : ''
            ))
            : <h4>No Client Orders</h4>
        }
      </div>
      <Form horizontal style={{color: '#969696'}}>
        <FormGroup>
        
          <Col componentClass={ ControlLabel } sm={4}>
            Order Amount 
          </Col>
          <Col componentClass={ ControlLabel } sm={8}>
            <FormControl
              type="text" 
              id="amount"
              defaultValue='Enter order amount'
            />
          </Col>

          <Col componentClass={ ControlLabel } sm={4}>
            Coin 
          </Col>
          <Col componentClass={ ControlLabel } sm={8}>
            <FormControl
              componentClass="select"
              placeholder="select"
              id="coin"
            >
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
            </FormControl>
          </Col>

          <Button 
            className={ "updateBtn" } 
            bsSize="small"
            bsStyle="primary" type="submit" 
            onClick={(event) => createOrder(event, handleCreateOrder)}>
            Add Order
          </Button>

        </FormGroup>
      </Form>
    </div>
  )
}
