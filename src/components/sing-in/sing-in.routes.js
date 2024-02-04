const express = require('express')
const router = express.Router()
const { inicioSesion, infoBienvenida } = require('./sing-in.controller')

router
        .post('/login', inicioSesion)
        .get('/bienvenida/:idCardWorker', infoBienvenida)

module.exports = router
