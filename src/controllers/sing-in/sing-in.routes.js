const express = require('express')
const router = express.Router()
const { infoBienvenida, login } = require('./sing-in.controller')

router
        //Ruta para iniciar Session
        .post('/login', login)

        //Ruta para obtener la informacion de bienvenida según el id del empleado
        .get('/bienvenida/:idCardWorker', infoBienvenida)

module.exports = router
