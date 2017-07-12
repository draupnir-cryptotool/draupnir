import React from 'react'
// import BitfinexWrapper from './BitfinexWrapper'
import { Table } from 'react-bootstrap'
import BitfinexBitPrice from './BitfinexBitcoinPrice'
import BitfinexEthPrice from './BitfinexEthPrice'
import BtceBitcoinPrice from './BtceBitcoinPrice'
import BitstampBitcoinPrice from './BitstampBitcoinPrice'
import BtceEthPrice from './BtceEthPrice'
import { Button } from 'react-bootstrap'
import './livePrice.css'

export default function LivePriceWrapper({
  bitfinexBtcValue, bitfinexEthValue, btceBtcValue, btceEthValue, bitstampBtcValue, onCurrencyChangeUsd,
  onCurrencyChangeAud
}) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th></th>
            <th>Bitfinex</th>
            <th>BTC-E</th>
            <th>Bitstamp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><h4>BTC-E:</h4></td>
            <td><BitfinexBitPrice bitfinexBtcValue={ parseFloat(bitfinexBtcValue).toFixed(2) }/> </td>
            <td> <BtceBitcoinPrice btceBtcValue={ parseFloat(btceBtcValue).toFixed(2) }/> </td>
            <td> <BitstampBitcoinPrice bitstampBtcValue={ parseFloat(bitstampBtcValue).toFixed(2) } /> </td>
          </tr>
          <tr>
            <td><h4>ETH:</h4></td>
            <td> <BitfinexEthPrice bitfinexEthValue={ parseFloat(bitfinexEthValue).toFixed(2) }/> </td>
            <td> <BtceEthPrice btceEthValue={ parseFloat(btceEthValue).toFixed(2) }/> </td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <div style={{ textAlign: 'center' }}>
        <Button  className='currencySwitch' bsStyle='default' bsSize='lg' onClick={onCurrencyChangeUsd}>USD</Button>
        <Button  className='currencySwitch' bsStyle='default' bsSize='lg' onClick={onCurrencyChangeAud}>AUD</Button>
      </div>
    </div>
  )
}
