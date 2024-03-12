const express = require("express");
const router = express.Router()
const { createClient, getClient, updateClient } = require("./client.controller");

router
        //Ruta para crear un cliente
        .post('/cliente', createClient)

        //Ruta para obtener la información de un cliente
        .get('/cliente/:idCardClient', getClient)

        //Ruta para actualizar la información de un cliente
        .put('/cliente/:idCardClient', updateClient)

module.exports = router;