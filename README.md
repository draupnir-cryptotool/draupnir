## Backend

Draupnir is running a Node.js server with Express routing and a MongoDB database.

The backend performs a number of tasks, including;
 - Fetching foreign exchange rates
 - Fetching cryptocurrency live price ticker data from various exchanges
 - Creating pdf quotes and emailing them to customers
 - Fetching cryptocurrency prices from Australian exchanges
 - Authenticating users

One of the major functions of the backend API is to calculate the most cost effective orders to purchase over multiple exchanges, given certain information.

The logic for this order calculation changed dramatically over the span of the project, as more use cases and scenarios became apparent from our process of testing and running user flow analysis.

The current logic flow of the order calculator is outlined below.

If a customer wants to purchase $10,000 of Bitcoin, the following logic steps are executed:
 1. The frontend sends a get request to the API with a large query string. Details of which are below.
 2. The API sends out fetch requests to all of the configured exchanges, and recieves their complete order books.
 3. As every exchange formats their API response differently, the responses have to be transformed into a uniform structure.
 4. Once all of the exchanges have returned their orders, they are combined into a single list.
 5. Every order is looked at, starting with the cheapest. For each order, various factors are considered:
   1. Has the total required order amount already been filled?
   2. Does the exchange have funds remaining in its float?
   3. Can we take all, or just part of the order?
 6. When the order total has been fulfilled this way, it tallys how much is being purchased from each exchange.
 7. USD to AUD exchange rates are fetched, and all prices are converted into AUD.
 8. Both USD and AUD figures are returned to the frontend.

There are a lot of different use cases and edge cases that need to be taken into account when calculating the optimal order.
 - The user is able to specify if they want to purchase up to an amount of USD, or up to an amount of crytocurrency. For example, they can ask for $10,000 worth of Bitcoin, or 5 Bitcoins. This affects how the calculations are performed.
 - The brokers using Draupnir will have different amounts of funds availiable on exchanges at different times. These floats need to be taken into account for each order, so as to not advise the user to make purchases on an exchange where they don't have the funds to cover it.
 - It is possible to only take a part of a single order from an exchange. For example, if the client has asked for 2 Bitcoin, and there is and order on the exchange selling 4 Bitcoin, we can take just half of the order. This is taken into account to allow us to fill user oreder amounts exactly to the cent.

## Issues and Improvements
The order API could be improved in many ways.

The HTTP method could be changed to POST, and all of the information currently being passed in the query string can be sent in the body in a standard JSON format.

The API could initially perform health checks on all of the external exchange APIs. This would allow us to only add excahnges that are responding to be added to the call queue, and would let us give the users error information when echanges are down.

Currently we only use the public APIs from the cryptocurrency exchanges. These exchanges all provide authenticated APIs that allow you to perform various trades. This tool could be extended to allow automatic trading. This would of course greatly increase financial risks from any errors in the code and would need to be carefully tested.

## Order API Breakdown
### URL
`http://localhost:8000/api/order?buying=btc&tally=usd&amount=20000&btceLimit=5000&bitstampLimit=5000&bitfinexLimit=5000`

### Queries:
  - **buying**
    - string
    - currency that this order wants to purchase
    - Example: ?buying=btc
  - **tally**
    - string
    - currency to tally the order by i.e. do you want 5 btc or 10000 worth?
    - Example: ?tally=usd
  - **amount**
    - integer
    - amount of buying currency to tally to i.e how much do you want?
    - Example: ?amount=10000
  - **btceLimit**
    - integer
    - maximum amount (in usd) that can be purchases from BTC-e exchange
    - Example: ?btceLimit=5000
  - **bitstampLimit**
    - integer
    - maximum amount (in usd) that can be purchases from Bitstamp exchange
    - Example: ?bitstampLimit=5000
  - **bitfinexLimit**
    - integer
    - maximum amount (in usd) that can be purchases from Bitfinex exchange
    - Example: ?bitfinexLimit=5000

### Example API Calls
**Purchase 5 BTC at best price, with USD$5000 limit on each exchange**

`http://localhost:8000/api/order?buying=btc&tally=btc&amount=5&btceLimit=5000&bitstampLimit=5000&bitfinexLimit=5000`

**Purchase USD$10,000 worth of Ether with USD$0 on BTC-e and USD$20,000 on each of the other exchanges**

`http://localhost:8000/api/order?buying=eth&tally=usd&amount=10000&btceLimit=0&bitstampLimit=20000&bitfinexLimit=20000`

