import React from 'react'
import { Collapse } from 'react-collapse'

export default function ClientExpand({
  expanded, clientPage, changeRoute
}) {
  return (
      <div>
        <Collapse isOpened={ expanded } fixedHeight={300}>
        <div>
          <nav>
            <a onClick={() => changeRoute('status')}>STATUS</a>
            <a onClick={ () => changeRoute('info') }>INFO</a>
            <a onClick={ () => changeRoute('notes') }>NOTES</a>
            <a onClick={ () => changeRoute('logs') }>LOGS</a>
            <a onClick={ () => changeRoute('order') }>ORDER</a>
            <a onClick={ () => changeRoute('quotes') }>QUOTES</a>
          </nav>
          {
            clientPage === 'status' ?
            <h1>status</h1>
            :
            clientPage === 'info' ?
            <h1>info</h1>
            :
            clientPage === 'notes' ?
            <h1>notes</h1>
            :
            clientPage === 'logs' ?
            <h1>logs</h1>
            :
            clientPage === 'order' ?
            <h1>order</h1>
            :
            clientPage === 'quotes' ?
            <h1>quotes</h1>
            :
            ""
          }
        </div>
        </Collapse>
      </div>
  )
}
