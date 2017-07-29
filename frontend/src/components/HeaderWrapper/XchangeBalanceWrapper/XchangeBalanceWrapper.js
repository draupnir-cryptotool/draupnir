import React from 'react'
import {
  Table,
} from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import './XchangeBalance.css';
import styles from './font.css';

export default function XchangeBalanceWrapper({
  settings
}) {
  const wrapperStyle = {
    display: 'flex',
  }
  return (
    <div style={{color: '#969696', fontSize: '2rem'}}>
      <Table>
        <thead style={{color: '#EF940D'}}>
          <tr>
            <th>Exchange</th>
            <th>Float</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bitfinex</td>
            <td>
              <NumberFormat
                value={settings.bitfinexFloat}
                decimalPrecision={2}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </td>
          </tr>
          <tr>
            <td>Bitstamp</td>
            <td>
              <NumberFormat
                value={settings.bitstampFloat}
                decimalPrecision={2}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </td>
          </tr>
          <tr>
            <td>BTC-e</td>
            <td>
              <NumberFormat
                value={settings.btceFloat}
                decimalPrecision={2}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
