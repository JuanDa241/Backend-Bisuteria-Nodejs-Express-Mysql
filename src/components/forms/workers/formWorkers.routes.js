const express = require('express')
const router = express.Router()
const { allBanks, allRoles } = require('./formWorkers.controller')

router
        .get('/rol', allRoles)
        .get('/banco', allBanks)

module.exports = router