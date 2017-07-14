import React from 'react'
import './staging.css'
import ClientExpand from './clientExpand'



export default function ClientBar({
  client, uniqId, firstname, lastname,
  expanded = false, onExpand
}) {
  return(
    <div>
        <div>
          <div onClick={ onExpand } style={{ border: "solid 1px", marginTop: "2em" }}>
            <div id="clientBarTitle">
              <div><p>{ uniqId }</p></div>
              <div><p>{ firstname + " " + lastname }</p></div>
              <div><p>$10000</p></div>
              <div><p>BTC-E</p></div>
            </div>
          </div>
          <ClientExpand expanded={ expanded }/>
        </div>
    </div>
  )
}
