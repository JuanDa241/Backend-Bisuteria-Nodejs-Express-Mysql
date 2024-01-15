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

//Routes
const products = require('./components/products/product.routes')
const formWorkers = require('./components/forms/workers/formWorkers.routes')
const formProducts = require('./components/forms/products/formProducts.routes')


//Combined Routes
const combinedRoutes = express.Router()
combinedRoutes.use('/', products)
combinedRoutes.use('/', formWorkers)
combinedRoutes.use('/', formProducts)

//Basic Route
app.use('/IRis', combinedRoutes)


module.exports = app