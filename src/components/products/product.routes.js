const express = require('express')
const router = express.Router()
const { getAllProduct, getProduct ,createProduct, updateProduct ,deleteProduct } = require('./product.controller')
const { productUpload } = require('../../config/multer')

router
        .get('/productos', getAllProduct)
        .get('/productos/:idProduct', getProduct)
        .post('/producto', productUpload.single('image'),createProduct)
        .put('/productos/:idProduct', productUpload.single('image'),updateProduct)
        .delete('/productos/:idProduct', deleteProduct)

module.exports = router