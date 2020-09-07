const socket = io()

//get a div from HTML
const priceList = document.getElementById('price')

// a function to create a paragraph == accept a string as only parameter for the content of paragraph
createPriceEl = (symboleName) => {
  const item = document.createElement('p')
  item.textContent = symboleName
  item.id = symboleName
  return item
}

// a function for updating prices 
contentUpdate = (symboleName, newPrice) => {
  const item = document.querySelector(`#${symboleName}`)
  item.innerHTML = newPrice
} 

const symboleNames = ['BNBTUSD', 'XRPTUSD', 'ETHTUSD', 'BTCTUSD', 'LINKTUSD',
 'LTCTUSD', 'BCHUSDT', 'TRXUSDT', 'DASHUSDT', 'ADAUSDT', 'XLMUSDT',
  'XMRUSDT', 'DOGEUSDT', 'XTZUSDT', 'ONTUSDT']

socket.on('connect', () => {
  priceList.innerHTML = ''
  symboleNames.map(symbolName => {
    priceList.appendChild(createPriceEl(symbolName))
  })
})

symboleNames.map(el => {
  socket.on(el, (price) => {
    contentUpdate(el, `${price}`)
  })
})
