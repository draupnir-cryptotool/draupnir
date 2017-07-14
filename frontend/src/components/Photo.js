import React from 'react'

export default function Photo({
  url
}) {
  return (
    <div>
      <img src={ url } alt="image" />
    </div>
  )
}
