const express = require('express')
const router = express.Router()
const { getProduct ,createProduct, updateProduct , activateInactiveProduct, getActivateInactiveProduct} = require('./product.controller')
const { productUpload } = require('../../config/multer')

router
        //Ruta para obtener los productos según el estado
        .get('/productos/Activo-Inactivo/:idState', getActivateInactiveProduct)

        .get('/productos/:idProduct', getProduct)

        //Ruta para crear un producto
        .post('/producto', productUpload.single('image'),createProduct)

        .put('/productos/:idProduct', productUpload.single('image'),updateProduct)

        //Ruta para actualizar la informacion de un producto
        .put('/producto/Activo-Inactivo/:idProduct/:idState', activateInactiveProduct)

module.exports = router