import React from 'react'

export default function Refresh({
  onUpdate
}) {
  return (
    <button onClick={onUpdate}>Refresh</button>
  )
}