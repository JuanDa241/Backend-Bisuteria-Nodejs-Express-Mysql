const express = require('express')
const router = express.Router()
const { getworker ,createworker, updateworker, profile, activateInactiveWorker, getActivateInactiveWorker } = require('./worker.controller')
const { workerUpload } = require('../../config/multer')

router
        //Ruta para obtener a todos los trabajadores según su estado
        .get('/trabajador/Activo-Inactivo/:idState', getActivateInactiveWorker)
        //Ruta para obtener la informacion de un trabajador
        .get('/trabajadores/:idCardWorker', getworker)
        //Ruta para obtener el perfil de un trabajador
        .get('/perfil/:idCardWorker', profile)

        //Ruta para insertar un nuevo trabajador a la base de datos
        .post('/trabajador', workerUpload.single('photo'),createworker)

        .put('/trabajadores/:idCardWorker', workerUpload.single('photo'), updateworker)
        //Ruta para cambiar el estado de un trabajador
        .put('/trabajador/Activo-Inactivo/:idCardWorker/:idState', activateInactiveWorker)

module.exports = router