const express = require('express')

//Routes
const sing_in = require('./components/sing-in/sing-in.routes')
const products = require('./components/products/product.routes')
const worker = require('./components/worker/worker.routes')
const formWorkers = require('./components/forms/workers/formWorkers.routes')
const formProducts = require('./components/forms/products/formProducts.routes')


//Combined Routes
const combinedRoutes = express.Router()
combinedRoutes.use('/', sing_in)
combinedRoutes.use('/', products)
combinedRoutes.use('/', worker)
combinedRoutes.use('/', formWorkers)
combinedRoutes.use('/', formProducts)

module.exports = combinedRoutes