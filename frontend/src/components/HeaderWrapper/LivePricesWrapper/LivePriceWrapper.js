import React from 'react'
// import BitfinexWrapper from './BitfinexWrapper'
import {
  Table,
  Button,
} from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import './livePrice.css'

export default function LivePriceWrapper({
  bitfinexBtcValue,
  bitfinexEthValue,
  btceBtcValue,
  btceEthValue, 
  bitstampBtcValue, 
  onCurrencyChangeUsd,
  onCurrencyChangeAud,
  currentCurrency
}) {

  return (
    <div>
    <div style={{color: '#969696', fontSize: '2rem'}}>
      <Table>
        <thead style={{color: '#EF940D'}}>
          <tr>
            <th>Exchange</th>
            <th>BTC</th>
            <th>ETH</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bitfinex</td>
            <td>
              <NumberFormat
                value={bitfinexBtcValue}
                decimalPrecision={2}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </td>
            <td>
              <NumberFormat
                value={bitfinexEthValue}
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
                value={bitstampBtcValue}
                decimalPrecision={2}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </td>
            <td>
              NA
            </td>
          </tr>
          <tr>
            <td>BTC-e</td>
            <td>
              <NumberFormat
                value={btceBtcValue}
                decimalPrecision={2}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </td>
            <td>
              <NumberFormat
                value={btceEthValue}
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
      <div style={{marginLeft: '35%', display: "flex"}}>
        <div style={{ flexDirection: "row" }}>
          <Button
            className='currencySwitch'
            bsStyle='default'
            bsSize='small'
            onClick={onCurrencyChangeUsd}
            style={{
              backgroundColor: currentCurrency === 'usd' ? '#EF940D' : "#969696",
              borderColor: currentCurrency === 'usd' ? '#EF940D' : "#969696",
            }}
          >
            USD
          </Button>
        </div>
        <div style={{ flexDirection: "row" }}>
          <Button
            className='currencySwitch'
            bsStyle='default'
            bsSize='small'
            onClick={onCurrencyChangeAud}
            style={{
              backgroundColor: currentCurrency === 'aud' ? '#EF940D' : "#969696",
              borderColor: currentCurrency === 'aud' ? '#EF940D' : "#969696",
            }}
          >
            AUD
          </Button>
        </div>
      </div>
    </div>
  )
}
