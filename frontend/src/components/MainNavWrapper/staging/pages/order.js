import React from 'react';
import {
  Button,
  Well,
} from 'react-bootstrap';
import Moment from 'react-moment'

export default function Order({
  order,
  handleDeleteOrder,
}) {
  const deleteOrder = (event) => {
    event.preventDefault();
    const orderId = order._id;

    handleDeleteOrder({ orderId });
  }

  return (
    <div style={{ color: '#969696'}}>
      <Well style={{backgroundColor: '#3b3b3b', borderColor: '#c4c4c4', marginBottom: '1rem'}} bsSize='small'>
        {order.amount + ' ' + order.coin + ' '}
        <Moment style={{color: "#a9a9a9"}} fromNow interval={0} date={order.created}/>
        <div style={{float: 'right'}} >
        <Button 
          bsSize="xsmall"
          bsStyle="danger" type="submit" 
          onClick={(event) => deleteOrder(event)}>
          Delete
        </Button>
      </div>
      </Well>
    </div>
  )
}
