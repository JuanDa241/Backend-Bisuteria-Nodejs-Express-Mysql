const express = require('express')
const router = express.Router()
const { allCategory, filterCategory } = require('./formProducts.controller')

router
        .get('/categoria', allCategory)
        .get('/categoria/:idCategory', filterCategory)

module.exports = router