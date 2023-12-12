const express = require('express')
const router = express.Router()
const { bancosTodos, rolTodos } = require('./formWorkers.controller')

router
        .get('/rol', rolTodos)
        .get('/banco', bancosTodos)

module.exports = router