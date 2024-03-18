const express = require("express");
const router = express.Router()
const { createListwork, getListwork } = require("./listwork.controller");

router
        //Ruta para crear una lista de trabajo
        .post('/listwork', createListwork)

        //Ruta para obtener la información de una lista de trabajo
        .get('/listwork/:idOrderDetail', getListwork)


module.exports = router;