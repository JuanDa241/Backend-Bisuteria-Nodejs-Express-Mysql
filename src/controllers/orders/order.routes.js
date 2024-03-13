const express = require('express');
const { createOrder } = require('./orders.controller');
const router = express.Router();


router
      //Ruta para crear una orden en la base de datos
      .post('/orden', createOrder)

module.exports = router;