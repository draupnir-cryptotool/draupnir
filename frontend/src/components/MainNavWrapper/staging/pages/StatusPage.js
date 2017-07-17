import React from 'react'


export default function StatusPage({
  status
}){

  return (
    <div>
      {
        status.quoteSent ?
        <h3>Quote Sent: {status.quoteSent} <span>YES</span></h3>
        :
        <h3>Quote Sent: <span>NO</span></h3>
      }
      {
        status.quoteAccepted ?
        <h3>Quote Accepted: <span>YES</span> </h3>
        :
        <h3>Quote Accepted: <span>NO</span></h3>
      }
      {
        status.idVerified ?
        <h3>Id Verified: <span>YES</span></h3>
        :
        <h3>Id Verified: <span>NO</span></h3>
      }
      {
        status.depositCleared ?
        <h3>Deposit Cleared: <span>YES</span></h3>
        :
        <h3>Deposit Cleared: <span>NO</span></h3>
      }
    </div>
  )
}

