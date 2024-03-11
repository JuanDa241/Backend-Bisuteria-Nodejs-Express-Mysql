const express = require('express')
const router = express.Router()
const { allBanks, allRoles, craftsman } = require('./formWorkers.controller')

router
        .get('/artesano', craftsman)

module.exports = router