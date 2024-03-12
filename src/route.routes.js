const express = require('express')

//Routes
const sing_in = require('./controllers/sing-in/sing-in.routes')
const products = require('./controllers/products/product.routes')
const worker = require('./controllers/worker/worker.routes')
const client = require('./controllers/client/client.routes')
const orders = require('./controllers/orders/order.routes')

//Combined Routes
const combinedRoutes = express.Router()
combinedRoutes.use('/', sing_in)
combinedRoutes.use('/', products)
combinedRoutes.use('/', worker)
combinedRoutes.use('/', client)
combinedRoutes.use('/', orders)

module.exports = combinedRoutes