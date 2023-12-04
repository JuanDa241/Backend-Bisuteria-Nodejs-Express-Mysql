const express = require('express')
const router = express.Router()
const { getAllProduct, getProduct ,createProduct, updateProduct ,deleteProduct } = require('./product.controller')

router
        .get('/products', getAllProduct)
        .get('/products/:idProduct', getProduct)
        .post('/products', createProduct)
        .put('/products/:idProduct', updateProduct)
        .delete('/products/:idProduct', deleteProduct)

module.exports = router