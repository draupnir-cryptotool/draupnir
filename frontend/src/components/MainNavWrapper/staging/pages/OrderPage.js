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
  {console.log(buying)}
    {console.log('---------')}
    {console.log(tally)}
    {console.log('---------')}
    {console.log(amount)}
    {console.log('---------')}
    {console.log(bitfinexLimit)}
    {console.log('---------')}
    {console.log(btceLimit)}
    {console.log('---------')}
    {console.log(bitstampLimit)}
    {console.log('---------')}
}

export default function OrderPage({ 
  settings, orders, onRequest
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
        !_.isEmpty(orders) ? ( 
        <ul>
          <li>
            <p>Bitfinex: $
              {orders.exchanges.bitfinex.usdSpent}
      
              {'  '}
              coins: 
              {orders.exchanges.bitfinex.coinBought}

            </p>
          </li>
          <li>
            <p>Bitstamp: $
              {orders.exchanges.bitstamp.usdSpent}

              {'  '}
              coins: 
              {orders.exchanges.bitstamp.coinBought}
            </p>
          </li>
          <li>
            <p>BTC-e: $ 
              {orders.exchanges.btce.usdSpent}

              {'  '}
              coins: 
              {orders.exchanges.btce.coinBought}
            </p>
          </li>
          <li>
            <p>Total Gained:&nbsp;   
              { orders.totalUsdSpent }

              {'  '}
              coins: 
              { orders.totalCoinBought }
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