import React from 'react'
// import BitfinexWrapper from './BitfinexWrapper'
import { Table } from 'react-bootstrap'
import BitfinexBitUsd from './BitfinexBitcoinUsd'
import BitfinexEthUsd from './BitfinexEthUsd'
import BtceBitUsd from './BtceBitcoinUsd'
import BitstampBitUsd from './BitstampBitcoinPrice'
import BtceEthUsd from './BtceEthUsd'

export default function UsdLivePriceWrapper({
  bitfinexBtcValue, bitfinexEthValue, btceBtcValue, btceEthValue, bitstampBtcValue
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
            <td><BitfinexBitUsd bitfinexBtcValue={ bitfinexBtcValue.btcPrice.toFixed(2) }/> </td>
            <td> <BtceBitUsd btceBtcValue={ btceBtcValue.btcPrice.toFixed(2) }/> </td>
            <td> <BitstampBitUsd bitstampBtcValue={ parseFloat(bitstampBtcValue.btcPrice).toFixed(2) } /> </td>
          </tr>
          <tr>
            <td>ETH:</td>
            <td> <BitfinexEthUsd bitfinexEthValue={ bitfinexEthValue.ethPrice.toFixed(2) }/> </td>
            <td> <BtceEthUsd btceEthValue={ btceEthValue.ethPrice.toFixed(2) }/> </td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
