const express = require('express');
const { createOrder, getOrderState } = require('./orders.controller');
const router = express.Router();


router
      //Ruta para crear una orden en la base de datos
      .post('/orden', createOrder)

      //Ruta para obtener los pedidos según si estado
      .get('/orden/:idState', getOrderState)

module.exports = router;