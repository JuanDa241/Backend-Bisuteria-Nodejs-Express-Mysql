const express = require('express')
const router = express.Router()
const { getAllworker, getworker ,createworker, updateworker ,deleteworker, profile, listWorker } = require('./worker.controller')
const { workerUpload } = require('../../config/multer')

router
        .get('/trabajadores', getAllworker)
        .get('/trabajadores/:idCardWorker', getworker)
        .get('/perfil/:idCardWorker', profile)
        .get('/listarTrabajadores', listWorker)

        .post('/trabajador', workerUpload.single('photo'),createworker)
        .put('/trabajadores/:idCardWorker', workerUpload.single('photo'), updateworker)
        .delete('/trabajadores/:idCardWorker', deleteworker)

module.exports = router