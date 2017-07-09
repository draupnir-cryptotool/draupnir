import React from 'react'
// import BitfinexWrapper from './BitfinexWrapper'
import { Table } from 'react-bootstrap'
import BitfinexBitUsd from './BitfinexBitcoinUsd'
import BitfinexEthUsd from './BitfinexEthUsd'
import BtceBitUsd from './BtceBitcoinUsd'
import BitstampBitUsd from './BitstampBitcoinPrice'
import BtceEthUsd from './BtceEthUsd'
import { Button } from 'react-bootstrap'

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
            <td>BTC-E:</td>
            <td><BitfinexBitUsd bitfinexBtcValue={ parseFloat(bitfinexBtcValue).toFixed(2) }/> </td>
            <td> <BtceBitUsd btceBtcValue={ parseFloat(btceBtcValue).toFixed(2) }/> </td>
            <td> <BitstampBitUsd bitstampBtcValue={ parseFloat(bitstampBtcValue).toFixed(2) } /> </td>
          </tr>
          <tr>
            <td>ETH:</td>
            <td> <BitfinexEthUsd bitfinexEthValue={ parseFloat(bitfinexEthValue).toFixed(2) }/> </td>
            <td> <BtceEthUsd btceEthValue={ parseFloat(btceEthValue).toFixed(2) }/> </td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <div>
        <Button  bsStyle='default' bsSize='lg' onClick={onCurrencyChangeUsd}>USD</Button>
        <Button  bsStyle='default' bsSize='lg' onClick={onCurrencyChangeAud}>AUD</Button>
      </div>
    </div>
  )
}
