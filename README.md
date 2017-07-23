# draupnir
A tool for calculating the best price of cryptocurrencies over multiple exchanges.
## Dependencies added
1. express
2. mongoose
3. body-parser
4. nodemon
5. node-fetch
6. eslint
7. lodash
8. cors
9. dotenv
10. jsonwebtoken
11. passport-jwt
12. passport-local
13. passport-local-mongoose
14. axios
15. react-router-dom
16. react-bootstrap
17. lodash(react)
18. babel-plugin-lodash(react)
19. babel-preset-env(react)
20. shortid
21. react-motion
22. react-collapse
23. react-icons
24. jwt-decode

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

