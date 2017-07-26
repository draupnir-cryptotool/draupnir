import React from 'react'
import {
  Table,
} from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import FaRefresh from 'react-icons/lib/fa/refresh'
import BitcoinWalletBalance from './BitcoinWalletBalance'
import EthereumWalletBalance from './EthereumWalletBalance'
import './wallet.css'

export default function WalletWrapper({
  bitBalance, etherBalance, onBtcUpdate, onEthUpdate
}) {

  return (
    <div style={{color: '#969696', fontSize: '2rem'}}>
      <Table>
        <thead style={{color: '#EF940D'}}>
          <tr>
            <th>Wallet</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bitcoin</td>
            <td>
              <NumberFormat
                value={bitBalance.btceWalletBalance}
                decimalPrecision={8}
                displayType={'text'}
                thousandSeparator={true}
              />
            </td>
            <td>
              <FaRefresh style={{color: '#EF940D'}} fontSize={18} onClick={ onBtcUpdate }/> 
            </td>
          </tr>
          <tr>
            <td>Ethereum</td>
            <td>
              <NumberFormat
                value={etherBalance.ethWalletBalance}
                decimalPrecision={15}
                displayType={'text'}
                thousandSeparator={true}
              />
            </td>
            <td>
              <FaRefresh style={{color: '#EF940D'}} fontSize={18} onClick={ onEthUpdate }/> 
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
