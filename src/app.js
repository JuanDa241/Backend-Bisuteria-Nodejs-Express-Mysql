const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config();
const { urlencoded, json } = require('express')
const bodyParser = require('body-parser');
const combinedRoutes = require('./route.routes');

//Port
const port = process.env.PORT || 4141

//Server initialization
const app = express()

app.use('/IRis/uploads', express.static('uploads'));

//setting
app.set('port', port)

//Middlewars
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())

//Route
app.use('/IRis', combinedRoutes)


module.exports = app