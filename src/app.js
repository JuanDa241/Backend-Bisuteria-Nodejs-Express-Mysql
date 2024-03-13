const express = require('express')
const cors = require('cors')
const {Server} = require('socket.io')
const http = require('http');
require('dotenv').config();
const { urlencoded, json } = require('express')
const combinedRoutes = require('./route.routes');

//Port
const port = process.env.PORT || 4141

//Server initialization
const app = express()
const server = http.createServer(app);

//Inicialización de Socket
const io = new Server(server, {
  cors : {
    origin: '*'
  }
})

//Uso de los archivos estaticos del proyecto
app.use('/IRis/uploads', express.static('uploads'));

//setting
app.set('port', port)

//Middlewars
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())

//Route
app.use('/IRis', combinedRoutes)

module.exports = { app, server, io };