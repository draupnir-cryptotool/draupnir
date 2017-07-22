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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '5px', gridAutoRows: 'minmax(50px, auto)'}}>
        <div></div>
        <div><p style={{color: 'white', fontSize: '1.5em', color: '#3E47FF'}}>Bitfinex</p></div>
        <div><p style={{color: 'white', fontSize: '1.5em', color: '#3E47FF'}}>BTC-E</p></div>
        <div><p style={{color: 'white', fontSize: '1.5em', color: '#3E47FF'}}>Bitstamp</p></div>
        <div><p style={{color: 'white', textAlign: 'right', marginRight: '10px', fontSize: '1.5em'}}>BTC-E:</p></div>
        <div><BitfinexBitPrice bitfinexBtcValue={ parseFloat(bitfinexBtcValue).toFixed(2) }/></div>
        <div><BtceBitcoinPrice btceBtcValue={ parseFloat(btceBtcValue).toFixed(2) }/></div>
        <div><BitstampBitcoinPrice bitstampBtcValue={ parseFloat(bitstampBtcValue).toFixed(2) } /></div>

        <div><p style={{color: 'white', textAlign: 'right', marginRight: '10px', fontSize: '1.5em'}}>ETH:</p></div>
        <div><BitfinexEthPrice bitfinexEthValue={ parseFloat(bitfinexEthValue).toFixed(2) }/></div>
        <div><BtceEthPrice btceEthValue={ parseFloat(btceEthValue).toFixed(2) }/></div>
        
      </div>
      <div style={{textAlign: 'center'}}>
        <Button  className='currencySwitch' bsStyle='default' bsSize='small' onClick={onCurrencyChangeUsd}>USD</Button>
        <Button  className='currencySwitch' bsStyle='default' bsSize='small' onClick={onCurrencyChangeAud}>AUD</Button>
      </div>
    </div>
  )
}
