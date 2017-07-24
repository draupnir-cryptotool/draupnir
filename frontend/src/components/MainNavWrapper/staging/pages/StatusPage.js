import React from 'react'
import _ from 'lodash'
import Validated from './Validated'
import NotValidated from './NotValidated'
import GoCheck from 'react-icons/lib/go/check'
import GoX from 'react-icons/lib/go/x'
import './pages.css'

export default function StatusPage({
  status,
  client,
  onUpdateStatus
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

  const handleUpdateStatus = (clientId, onUpdateStatus, fieldName) => {
    const statusType = statusTypeToField[fieldName]
    onUpdateStatus({ clientId, statusType })
  }

  return (
    <div className="statusPage" style={{ marginLeft: "2%", marginTop: "2%" }}>
      
      {
        !!_.includes(status, false) ? <NotValidated /> : <Validated />
      }

      {
        status.quoteSent ?
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Quote Sent</h3><span style={ quoteTrue }>
          <GoCheck onClick={() => handleUpdateStatus(client._id, onUpdateStatus, "quoteSent" ) }
          className="toggleVerification" size={20}/></span>
        </div>
          :
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Quote Sent</h3><span style={ quoteFalse }>
          <GoX onClick={() => handleUpdateStatus(client._id,onUpdateStatus, "quoteSent") } 
            className="toggleVerification" size={20} /></span>
        </div>
      }
      {
        status.quoteAccepted ?
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Quote Accepted</h3><span style={ quoteTrue }>
          <GoCheck onClick={() => handleUpdateStatus(client._id, onUpdateStatus, "quoteAccepted") }
          className="toggleVerification" size={20}/></span>
        </div>
          :
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Quote Accepted</h3><span style={ quoteFalse }>
          <GoX onClick={() => handleUpdateStatus(client._id, onUpdateStatus, "quoteAccepted") } 
            className="toggleVerification" size={20} /></span>
        </div>
      }
      {
        status.idVerified ?
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Id Verified</h3><span style={ quoteTrue }>
          <GoCheck onClick={() => handleUpdateStatus(client._id, onUpdateStatus, "idVerified") }
          className="toggleVerification" size={20}/></span>
        </div>
        :
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Id Verified</h3><span style={ quoteFalse }>
          <GoX onClick={() => handleUpdateStatus(client._id, onUpdateStatus, "idVerified") } 
            className="toggleVerification" size={20} /></span>
        </div>
      }
      {
        status.depositCleared ?
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Deposit Cleared</h3><span style={ quoteTrue }>
          <GoCheck onClick={() => handleUpdateStatus(client._id, onUpdateStatus, "depositCleared") }
          className="toggleVerification" size={20}/></span>
        </div>
        :
        <div style={{ display: "flex", width: "25%" }}>
          <h3 style={ quoteField }>Deposit Cleared</h3><span style={ quoteFalse }>
          <GoX onClick={() => handleUpdateStatus(client._id, onUpdateStatus, "depositCleared") } 
            className="toggleVerification" size={20} /></span>
        </div>
      }
    </div>
  )
}

