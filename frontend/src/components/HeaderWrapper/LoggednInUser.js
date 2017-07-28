import React from 'react'

export default function LoggedInUser({
  currentUser
}) {
  return (
    <div>
      <p>Logged in as: { currentUser.firstname + ' ' + currentUser.lastname}</p>
    </div>
  )
}
