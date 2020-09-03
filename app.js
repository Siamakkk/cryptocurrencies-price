const express = require('express')
const app = express()

const Binance = require('node-binance-api')
const binance = new Binance()

const cryptoPriceRouter = require('./routes/cryptoPrice')

const PORT = 3000
const localhost = 'localhost'

app.use(express.static(__dirname + '/public'))
app.use('/api/v1/cryptoPrice', cryptoPriceRouter)

const server = app.listen(PORT, localhost, () => {
  console.log(`server is up on http://${localhost}:${PORT}`);
})


//LIVE PRICE CODE
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log('a user connected');
})

io.on('connect', socket => {
  setInterval(() => {
    binance.futuresPrices()
    .then((prices) => {
      for(let key in prices) {
        const dollarTORialExchangeRate = 220000
        prices[key] = ( parseFloat(prices[key]) * dollarTORialExchangeRate ).toString()
      }
      socket.emit('livePrice', ` 
      Binance : ${prices.BNBUSDT},
      Ripple : ${prices.XRPUSDT},
      Ethereum : ${prices.ETHUSDT},
      Bitcoin: ${prices.BTCUSDT},
      Chainlink : ${prices.LINKUSDT},
      Litecoin : ${prices.LTCUSDT},
      Bitcoincash : ${prices.BCHUSDT},
      Tron : ${prices.TRXUSDT},
      Dash : ${prices.DASHUSDT},
      Cardano : ${prices.ADAUSDT},
      Stellar : ${prices.XLMUSDT},
      Monero : ${prices.XMRUSDT},
      Ethereum : ${prices.ZECUSDT},
      Dogecoin : ${prices.DOGEUSDT},
      Tezos : ${prices.XTZUSDT},
      Ontology : ${prices.ONTUSDT}`
      );
    })
    .catch((err) => {
      socket.emit('livePrice', 'an error happend please try later')
      console.log('ERROR : ', err)})
    }, 1000);
});


