const express = require('express')
const router = express.Router()
const { getAllProduct, getProduct ,createProduct, updateProduct ,deleteProduct } = require('./product.controller')
const { productUpload } = require('../../config/multer')

router
        .get('/products', getAllProduct)
        .get('/products/:idProduct', getProduct)
        .post('/products', productUpload.single('image'),createProduct)
        .put('/products/:idProduct', updateProduct)
        .delete('/products/:idProduct', deleteProduct)

module.exports = router