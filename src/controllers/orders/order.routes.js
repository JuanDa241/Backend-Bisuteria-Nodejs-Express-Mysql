const express = require('express');
const { createOrder, getOrderState, getOrderStateIdCard, cancelOrder } = require('./orders.controller');
const router = express.Router();

router
      //Ruta para crear una orden en la base de datos
      .post('/orden', createOrder)

      //Ruta para obtener los pedidos según el estado
      .get('/orden/:idState', getOrderState)
      //Ruta para obtener los pedidos según el esatdo y el id del vendedor
      .get('/orden/:idState/:idCardWorker', getOrderStateIdCard)

      //Ruta para actualizar el estado de una orden
      .put('/orden/cancelar/:idOrder/:idState', cancelOrder)
      
module.exports = router;