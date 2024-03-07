const express = require('express')
const router = express.Router()
const { getworker ,createworker, updateworker ,deleteworker, profile, activeWorker, inactiveWorker } = require('./worker.controller')
const { workerUpload } = require('../../config/multer')

router
        .get('/trabajadoresActivos', activeWorker)
        .get('/trabajadoresInactivos', inactiveWorker)
        .get('/trabajadores/:idCardWorker', getworker)
        .get('/perfil/:idCardWorker', profile)

        .post('/trabajador', workerUpload.single('photo'),createworker)
        .put('/trabajadores/:idCardWorker', workerUpload.single('photo'), updateworker)
        .delete('/trabajadores/:idCardWorker', deleteworker)

module.exports = router