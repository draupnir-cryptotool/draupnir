import React from 'react'

export default function LoggedInUser({
  currentUser
}) {
  return (
    <div>
      <p>{ currentUser.firstname + ' ' + currentUser.lastname} loggin in</p>
    </div>
  )
}