const express = require('express')
const router = express.Router()
const { getworker ,createworker, updateworker ,deleteWorker, profile, activeWorker, inactiveWorker, activateWorker } = require('./worker.controller')
const { workerUpload } = require('../../config/multer')

router
        .get('/trabajadoresActivos', activeWorker)
        .get('/trabajadoresInactivos', inactiveWorker)
        .get('/trabajadores/:idCardWorker', getworker)
        .get('/perfil/:idCardWorker', profile)

        .post('/trabajador', workerUpload.single('photo'),createworker)

        .put('/trabajadores/:idCardWorker', workerUpload.single('photo'), updateworker)
        .put('/trabajadorInactivo/:idCardWorker', deleteWorker)
        .put('/trabajadorActivo/:idCardWorker', activateWorker)

module.exports = router