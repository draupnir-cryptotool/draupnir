import React from 'react';
import {
  Button,
  Well,
} from 'react-bootstrap';
import Moment from 'react-moment'
import NumberFormat from 'react-number-format'

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
        <NumberFormat value={order.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        {' of ' + order.coin + ' '}
        <Button 
          style={{float: 'right'}} 
          bsSize="xsmall"
          bsStyle="danger" type="submit" 
          onClick={(event) => deleteOrder(event)}>
          Delete
        </Button>
        <Moment style={{color: "#a9a9a9", float:'right', marginRight: '1rem'}} fromNow interval={0} date={order.created} />
      </Well>
    </div>
  )
}
