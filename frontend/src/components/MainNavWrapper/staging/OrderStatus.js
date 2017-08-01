import React from 'react'
import _ from 'lodash'

export default function OrderStatus({
  clientOrder
}) {
  return(
    <div>
      {
        !!_.includes(clientOrder.status, false) ?
        <div style={{flexDirection: "row", width: "1%", backgroundColor: "#CB2424"}}></div> :
        <div style={{flexDirection: "row", width: "1%", backgroundColor: "#4CC941"}}></div>
      }
    </div>
  )
}