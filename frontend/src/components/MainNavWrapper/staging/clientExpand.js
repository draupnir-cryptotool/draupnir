import React from 'react'
import { Collapse } from 'react-collapse'

export default function ClientExpand({
  expanded
}) {
  return (
    <div>
      <Collapse isOpened={ expanded }>
        <h1>Expanded!!</h1>
      </Collapse>
    </div>
  )
  
}