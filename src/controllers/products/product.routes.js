const express = require('express')
const router = express.Router()
const { getProduct ,createProduct, updateProduct ,deleteProduct, activeProduct, inactiveProduct, activateProduct } = require('./product.controller')
const { productUpload } = require('../../config/multer')

router
        .get('/productosActivos', activeProduct)
        .get('/productosInactivos', inactiveProduct)
        .get('/productos/:idProduct', getProduct)

        .post('/producto', productUpload.single('image'),createProduct)

        .put('/productos/:idProduct', productUpload.single('image'),updateProduct)
        .put('/productoInactivo/:idProduct', deleteProduct)
        .put('/productoActivo/:idProduct', activateProduct)

module.exports = router