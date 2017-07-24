import React from 'react';
import Moment from 'react-moment'

export default function Order({
  order
}) {
  return (
    <div style={{color: '#969696'}}>
      <Moment style={{color: "#a9a9a9"}} fromNow interval={0} date={order.created}/>
      <h4>{order.coin}</h4>
      <h4>{order.amount}</h4>
    </div>
  )
}
