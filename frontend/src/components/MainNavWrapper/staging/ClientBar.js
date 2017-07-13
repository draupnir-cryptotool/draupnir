import React from 'react'
import './staging.css'


export default function ClientBar({
  clients
}) {
  return(
    <div>
      {
        !!clients ?
        clients.map((client) =>
        <div key={ client._id } style={{ border: "solid 1px", marginTop: "2em" }}>
          <div id="clientBarTitle" >
            <div><p>{ client.uniqId }</p></div>
            <div><p>{ client.firstname + " " + client.lastname }</p></div>
            <div><p>$10000</p></div>
            <div><p>BTC-E</p></div>
          </div>
        </div>
        )
        :
        ""
      }
    </div>
  )
}
