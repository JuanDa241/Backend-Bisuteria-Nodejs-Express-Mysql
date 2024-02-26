const express = require('express')
const router = express.Router()
const { allBanks, allRoles, craftsman } = require('./formWorkers.controller')

router
        .get('/artesano', craftsman)
        .get('/rol', allRoles)
        .get('/banco', allBanks)

module.exports = router