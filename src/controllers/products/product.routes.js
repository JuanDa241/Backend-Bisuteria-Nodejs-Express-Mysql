const express = require('express')
const router = express.Router()
const { getProduct ,createProduct, updateProduct , activateInactiveProduct, getActivateInactiveProduct} = require('./product.controller')
const { productUpload } = require('../../config/multer')

router
        //Ruta para obtener los productos según el estado
        .get('/productos/Activo-Inactivo/:idState', getActivateInactiveProduct)
        //Ruta para obtener la información de un producto según su id
        .get('/productos/:idProduct', getProduct)

        //Ruta para crear un producto
        .post('/producto', productUpload.single('image'),createProduct)

        //Ruta para actualizar un producto según su id
        .put('/productos/:idProduct', productUpload.single('image'), updateProduct)
        //Ruta para actualizar la informacion de un producto
        .put('/producto/Activo-Inactivo/:idProduct/:idState', activateInactiveProduct)

module.exports = router