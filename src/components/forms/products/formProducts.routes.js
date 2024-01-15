const express = require('express')
const router = express.Router()
const { allCategory } = require('./formProducts.controller')

router
        .get('/categoria', allCategory)

module.exports = router