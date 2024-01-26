const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config();
const { urlencoded, json } = require('express')
const bodyParser = require('body-parser');

//Port
const port = process.env.PORT || 3004

//Server initialization
const app = express()

app.use('/IRis/uploads', express.static('uploads'));

//setting
app.set('port', port)

//Middlewars
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())

//Routes
const products = require('./components/products/product.routes')
const worker = require('./components/worker/worker.routes')
const formWorkers = require('./components/forms/workers/formWorkers.routes')
const formProducts = require('./components/forms/products/formProducts.routes')


//Combined Routes
const combinedRoutes = express.Router()
combinedRoutes.use('/', products)
combinedRoutes.use('/', worker)
combinedRoutes.use('/', formWorkers)
combinedRoutes.use('/', formProducts)

//Routes
app.use('/IRis', combinedRoutes)



module.exports = app