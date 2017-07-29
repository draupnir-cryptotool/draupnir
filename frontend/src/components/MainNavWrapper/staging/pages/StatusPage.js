import React from 'react'
import _ from 'lodash'
import Validated from './Validated'
import NotValidated from './NotValidated'
import GoCheck from 'react-icons/lib/go/check'
import GoX from 'react-icons/lib/go/x'
import './pages.css'

export default function StatusPage({
  onUpdateStatusTrue,
  onUpdateStatusFalse,
  client
}){
  const quoteField = { 
    flexDirection: "row",
    width: "75%" 
  }

  const quoteTrue = {
    flexDirection: "row",
    width: "10%",
    margin: "auto 0 9px",
    color: "#4CC941"
  }

  const quoteFalse = {
    flexDirection: "row",
    width: "10%",
    margin: "auto 0 9px",
    color: "#CB2424"
  }

  const statusTypeToField = {
    idVerified: 'idVerified',
    quoteSent: 'quoteSent',
    quoteAccepted: 'quoteAccepted',
    depositCleared: 'depositCleared'
  }

  const manageClientStatusTrue = (clientId, fieldName, onUpdateStatusTrue) => {
    const statusType = statusTypeToField[fieldName]
    onUpdateStatusTrue({ clientId, statusType })
  }

  const manageClientStatusFalse = (clientId, fieldName, onUpdateStatusTrue) => {
    const statusType = statusTypeToField[fieldName]
    onUpdateStatusFalse({ clientId, statusType })
  }

  return (
    <div className="statusPage" style={{ marginLeft: "2%", marginTop: "2%" }}>
      {
        !!_.includes(client.status, false) ? <NotValidated /> : <Validated />
      }
      {
        client.status.quoteSent ?
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Quote Sent</h3><span style={ quoteTrue }>
          <GoCheck onClick={() => (manageClientStatusFalse(client._id, "quoteSent", onUpdateStatusFalse))}
          className="toggleVerification" size={20}/></span>
        </div>
          :
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Quote Sent</h3><span style={ quoteFalse }>
          <GoX onClick={() => (manageClientStatusTrue(client._id, "quoteSent", onUpdateStatusTrue))} 
            className="toggleVerification" size={20} /></span>
        </div>
      }
      {
        client.status.quoteAccepted ?
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Quote Accepted</h3><span style={ quoteTrue }>
          <GoCheck onClick={() => manageClientStatusFalse(client._id, "quoteAccepted", onUpdateStatusFalse)}
          className="toggleVerification" size={20}/></span>
        </div>
          :
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Quote Accepted</h3><span style={ quoteFalse }>
          <GoX onClick={() => manageClientStatusTrue(client._id, "quoteAccepted", onUpdateStatusTrue)} 
            className="toggleVerification" size={20} /></span>
        </div>
      }
      {
        client.status.idVerified ?
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Id Verified</h3><span style={ quoteTrue }>
          <GoCheck onClick={() => manageClientStatusFalse(client._id, "idVerified", onUpdateStatusFalse) }
            className="toggleVerification" size={20}/></span>
        </div>
        :
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Id Verified</h3><span style={ quoteFalse }>
          <GoX onClick={() => manageClientStatusTrue(client._id, "idVerified", onUpdateStatusTrue) }
            className="toggleVerification" size={20} /></span>
        </div>
      }
      {
        client.status.depositCleared ?
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Deposit Cleared</h3><span style={ quoteTrue }>
          <GoCheck onClick={() => manageClientStatusFalse(client._id, "depositCleared", onUpdateStatusFalse) }
          className="toggleVerification" size={20}/></span>
        </div>
        :
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Deposit Cleared</h3><span style={ quoteFalse }>
          <GoX onClick={() => manageClientStatusTrue(client._id, "depositCleared", onUpdateStatusTrue) } 
            className="toggleVerification" size={20} /></span>
        </div>
      }
    </div>
  )
}

