import React from 'react'
import Field from '../../../Field'
import _ from 'lodash'

function submitOrder(event, onRequest) {
  event.preventDefault()
  const form = event.target
  const buying = form.elements['currency'].value
  const tally = form.elements['tally'].value
  const amount = parseInt(form.elements['deposit'].value)
  const bitfinexLimit = form.elements['bitfinexFloat'].value
  const btceLimit = form.elements['btceFloat'].value
  const bitstampLimit = form.elements['bitstampFloat'].value
  onRequest({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit })
}

export default function OrderPage({ 
  settings, orders, onRequest, tempOrder
}) {
  return (
    <div>
    
      <div>
        <form onSubmit={ (event) => submitOrder(event, onRequest) }>
          <Field
            label="Deposit"
            name="deposit"
            type="text"
          />
          <Field
            label="Currency"
            name="currency"
            type="text"
          />
          <Field
            label="Tally"
            name="tally"
            type="text"
          />    
          <Field
            label=""
            name="bitfinexFloat"
            type="hidden"
            defaultValue={ settings.bitfinexFloat }
          />
          <Field
            label=""
            name="btceFloat"
            type="hidden"
            defaultValue={ settings.btceFloat }
          />
          <Field
            label=""
            name="bitstampFloat"
            type="hidden"
            defaultValue={ settings.bitstampFloat }
          />
          <button>Submit</button>
        </form>

        <h3>Best Order</h3>

        {
        !_.isEmpty(tempOrder) ? ( 
        <ul>
          <li>
            <p>Bitfinex: $
              {tempOrder.exchanges.bitfinex.usdSpent}
      
              {'  '}
              coins: 
              {tempOrder.exchanges.bitfinex.coinBought}

            </p>
          </li>
          <li>
            <p>Bitstamp: $
              {tempOrder.exchanges.bitstamp.usdSpent}

              {'  '}
              coins: 
              {tempOrder.exchanges.bitstamp.coinBought}
            </p>
          </li>
          <li>
            <p>BTC-e: $ 
              {tempOrder.exchanges.btce.usdSpent}

              {'  '}
              coins: 
              {tempOrder.exchanges.btce.coinBought}
            </p>
          </li>
          <li>
            <p>Total Gained:&nbsp;   
              { tempOrder.totalUsdSpent }

              {'  '}
              coins: 
              { tempOrder.totalCoinBought }
            </p>
          </li>
        </ul>
        ) : (
          <p>loading..</p>
        )
        }
      </div>
    </div>
  )
}