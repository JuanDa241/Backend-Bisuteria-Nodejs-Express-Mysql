const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config();
const { urlencoded, json } = require('express')

//Port
const port = process.env.PORT || 3004

//Server initialization
const app = express()

app.use('/uploads', express.static('uploads'));

//setting
app.set('port', port)

//Middlewars
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())

//Controllers
const products = require('./components/products/product.routes')
const prueba = require('./components/forms/workers/formWorkers.routes')

//Routes
app.use('/IRis', products)
app.use('/IRisPrueba', prueba)


module.exports = app