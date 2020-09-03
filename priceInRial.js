const Binance = require('node-binance-api')
const binance = new Binance()

const priceInRial = async () => {
  const prices = await binance.prices()
  const dollarTORialExchangeRate = 220000
  
  for(let key in prices) {
    if(key.endsWith('TUSD')) {
      prices[key] = ( parseFloat(prices[key]) * dollarTORialExchangeRate ).toString()
    }
  }

    const price =  {
      Binance : prices.BNBTUSD,
      Ripple : prices.XRPTUSD,
      Ethereum : prices.ETHTUSD,
      Bitcoin: prices.BTCTUSD,
      Chainlink : prices.LINKTUSD,
      Litecoin : prices.LTCTUSD,
      Bitcoincash : prices.BCHUSDT,
      Tron : prices.TRXUSDT,
      Dash : prices.DASHUSDT,
      Cardano : prices.ADAUSDT,
      Stellar : prices.XLMUSDT,
      Monero : prices.XMRUSDT,
      Ethereum : prices.ZECUSDT,
      Dogecoin : prices.DOGEUSDT,
      Tezos : prices.XTZUSDT,
      Ontology : prices.ONTUSDT
    }

    return price
}

module.exports = priceInRial