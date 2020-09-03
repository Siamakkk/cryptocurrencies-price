const express = require('express')
const Router = express.Router()

const priceInRial = require('../priceInRial')


Router.route('/')
.get((req, res , next) => {
  priceInRial()
  .then((data) => {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.json(data)
  })
  .catch((err) => {
    res.statusCode = 500
    res.send( 'some problem happend please try later' )
    console.log(err) 
  })
  
});

module.exports = Router