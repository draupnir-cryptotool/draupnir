import React from 'react'

export default function LoggedInUser({
  currentUser
}) {
  return (
    <div>
      <p>{ currentUser.firstname + ' ' + currentUser.lastname} logged in</p>
    </div>
  )
}