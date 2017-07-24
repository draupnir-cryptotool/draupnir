import React from 'react';
import {
  Well,
} from 'react-bootstrap';
import Moment from 'react-moment'

export default function Order({
  order
}) {
  return (
    <div style={{ color: '#969696'}}>
      <Well bsSize='small'>
        {order.amount}
        {order.coin}
        <Moment style={{color: "#a9a9a9"}} fromNow interval={0} date={order.created}/>
      </Well>
    </div>
  )
}
