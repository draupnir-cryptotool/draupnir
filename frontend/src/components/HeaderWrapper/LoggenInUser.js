import React from 'react'

export default function LoggedInUser({
  current_user
}) {
  return (
    <div>
      <p>{ current_user.firstname + ' ' + current_user.lastname} loggin in</p>
    </div>
  )
}