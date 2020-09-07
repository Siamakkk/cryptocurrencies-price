const sockeIo = require('socket.io')
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
  console.log(`server is up on http://${localhost}:${PORT}`)
})




//LIVE PRICE CODE
const io = sockeIo(server)

io.on('connection', (socket) => {
  console.log('a user connected')
})
//list of cryptocurrencies to track
const symboleName = ['BNBTUSD', 'XRPTUSD', 'ETHTUSD', 'BTCTUSD', 'LINKTUSD',
 'LTCTUSD', 'BCHUSDT', 'TRXUSDT', 'DASHUSDT', 'ADAUSDT', 'XLMUSDT',
  'XMRUSDT', 'DOGEUSDT', 'XTZUSDT', 'ONTUSDT']

//fetching data from source and send it to client-side
io.on('connect', (socket) => {  
  binance.websockets.prevDay(false, (error, response) => {
    if(error) return socket.emit('BNBTUSD', 'problem fetching data fron binance')
    symboleName.map(el => {
      if(response.symbol === el) {
        const priceInRial = response.symbol + ':' + (parseFloat(response.averagePrice) * 220000)
        socket.emit(el, priceInRial)
      }
    })
  })
})
