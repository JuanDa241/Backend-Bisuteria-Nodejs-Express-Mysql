const express = require("express");
const router = express.Router()
const { createClient, getClient, updateClient, getClientIdOrder } = require("./client.controller");

router
        //Ruta para crear un cliente
        .post('/cliente', createClient)

        //Ruta para obtener la información de un cliente
        .get('/cliente/:idCardClient', getClient)
        //Ruta para obtener la información de un cliente según el idOrder
        .get('/cliente-Orden/:idOrder', getClientIdOrder)

        //Ruta para actualizar la información de un cliente
        .put('/cliente/:idCardClient', updateClient)

module.exports = router;