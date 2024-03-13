const express = require("express");
const router = express.Router()
const { createListwork } = require("./listwork.controller");

router
        //Ruta para crear una lista de trabajo
        .post('/listwork', createListwork)



module.exports = router;