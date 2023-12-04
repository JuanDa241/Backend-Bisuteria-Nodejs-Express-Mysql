const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config();
const { urlencoded, json } = require('express')

//Port
const port = process.env.PORT || 3004

//Server initialization
const app = express()

//setting
app.set('port', port)

//Middlewars
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())

//Controllers
const products = require('./components/products/product.routes')

//Routes
app.use('/IRis', products)


module.exports = app