const express = require('express')
const router = express.Router()
const { inicioSesion } = require('./sing-in.controller')

router
        .post('/login', inicioSesion);

module.exports = router
