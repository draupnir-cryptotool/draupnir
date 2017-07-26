import React from 'react'
import './pages.css'

export default function Hyperlink({
  exchangeName
}) {
  return (
    <div className="hyperlinkDiv">
    {
      exchangeName === 'bitfinex' ? 
      <a className="hyperlink" href="https://www.bitfinex.com/" target="_blank">Bitfinex</a> : 

      exchangeName === 'btce' ?
      <a className="hyperlink" href="https://btc-e.com/" target="_blank">Btc-E</a> :

      <a className="hyperlink" href="https://www.bitstamp.net/account/login/" target="_blank">Bitstamp</a>
    }
    </div>
  )
}