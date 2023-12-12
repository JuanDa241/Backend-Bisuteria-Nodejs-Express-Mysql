const express = require('express')
const router = express.Router()
const { getAllProduct, getProduct ,createProduct, updateProduct ,deleteProduct } = require('./product.controller')
const { productUpload } = require('../../config/multer')

router
        .get('/productos', getAllProduct)
        .get('/productos/:idProducto', getProduct)
        .post('/productos', productUpload.single('image'),createProduct)
        .put('/productos/:idProducto', updateProduct)
        .delete('/productos/:idProducto', deleteProduct)

module.exports = router